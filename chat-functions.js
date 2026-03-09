// Chat Functions
function toggleChat() {
    const chat = document.getElementById('ai-chat');
    const btn = document.getElementById('ai-chat-btn');
    
    isChatOpen = !isChatOpen;
    
    if(isChatOpen) {
        chat.classList.remove('chat-hidden');
        chat.classList.add('chat-visible');
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.classList.add('bg-red-500');
        btn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 100);
    } else {
        chat.classList.remove('chat-visible');
        chat.classList.add('chat-hidden');
        btn.innerHTML = '<i class="fas fa-comment-dots"></i>';
        btn.classList.remove('bg-red-500');
        btn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
    }
}

function showTypingIndicator() {
    const msgs = document.getElementById('chat-msgs');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'ai-message chat-message';
    typingDiv.innerHTML = `
        <div class="bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none">
            <div class="flex items-center gap-2">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span class="text-slate-500 dark:text-slate-400 text-xs">VroomFix AI sedang menaip...</span>
            </div>
        </div>
    `;
    msgs.appendChild(typingDiv);
    msgs.scrollTop = msgs.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function findBestMatch(question) {
    const q = question.toLowerCase();
    
    for (const [category, topics] of Object.entries(aiKnowledge)) {
        for (const [topicKey, topicData] of Object.entries(topics)) {
            if (q.includes(topicKey)) {
                return { category, topic: topicData, matchType: 'exact' };
            }
        }
    }
    
    const keywords = {
        'minyak': aiKnowledge.maintenance['minyak enjin'],
        'oil': aiKnowledge.maintenance['minyak enjin'],
        'tayar': aiKnowledge.maintenance['tayar'],
        'tire': aiKnowledge.maintenance['tayar'],
        'aircond': aiKnowledge.maintenance['aircond'],
        'ac': aiKnowledge.maintenance['aircond'],
        'tak start': aiKnowledge.problems['tak start'],
        'won\'t start': aiKnowledge.problems['tak start'],
        'overheat': aiKnowledge.problems['overheating'],
        'panas': aiKnowledge.problems['overheating'],
        'bunyi': aiKnowledge.problems['bunyi pelik'],
        'noise': aiKnowledge.problems['bunyi pelik'],
        'alat': aiKnowledge.tools['alat asas'],
        'tools': aiKnowledge.tools['alat asas'],
        'jack': aiKnowledge.tools['jack'],
        'beli kereta': aiKnowledge.general['beli kereta'],
        'buy car': aiKnowledge.general['beli kereta'],
        'jimat': aiKnowledge.general['jimat minyak'],
        'save fuel': aiKnowledge.general['jimat minyak']
    };
    
    for (const [keyword, topicData] of Object.entries(keywords)) {
        if (q.includes(keyword)) {
            return { category: 'general', topic: topicData, matchType: 'keyword' };
        }
    }
    
    return null;
}

function getAIResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('hai') || q.includes('hello') || q.includes('hi') || q.includes('helo')) {
        const randomResponse = friendlyResponses[Math.floor(Math.random() * friendlyResponses.length)];
        return `
            <div class="font-bold mb-2 flex items-center gap-2">
                <i class="fas fa-robot"></i> VroomFix AI
            </div>
            <div class="text-sm">
                ${randomResponse}
                <div class="mt-3 text-blue-600 dark:text-blue-400 text-xs">
                    <div class="font-bold">Cuba tanya tentang:</div>
                    <div>• "Cara check minyak enjin"</div>
                    <div>• "Kereta tak start, kenapa?"</div>
                    <div>• "Alat apa perlu untuk DIY?"</div>
                    <div>• "Tips jimat minyak"</div>
                </div>
            </div>
        `;
    }
    
    if (q.includes('terima kasih') || q.includes('thanks') || q.includes('thank you')) {
        return `
            <div class="font-bold mb-2 flex items-center gap-2">
                <i class="fas fa-robot"></i> VroomFix AI
            </div>
            <div class="text-sm">
                😊 <b>Sama-sama boss!</b> Saya gembira dapat membantu!
                <div class="mt-3 text-green-600 dark:text-green-400 text-xs">
                    <div>Jangan lupa practice safe DIY selalu!</div>
                    <div>Ada apa-apa lagi, tanya je ya! 💙</div>
                </div>
            </div>
        `;
    }
    
    const match = findBestMatch(question);
    
    if (match) {
        const { topic } = match;
        
        let responseHTML = `
            <div class="font-bold mb-2 flex items-center gap-2">
                <i class="fas fa-robot"></i> VroomFix AI
            </div>
            <div class="text-sm">
                <div class="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">${topic.title}</div>
        `;
        
        if (topic.steps) {
            responseHTML += `<div class="mb-4">`;
            topic.steps.forEach(step => {
                responseHTML += `<div class="mb-2">${step}</div>`;
            });
            responseHTML += `</div>`;
        }
        
        if (topic.advice) {
            responseHTML += `<div class="mb-4"><b>Advice:</b>`;
            topic.advice.forEach(item => {
                responseHTML += `<div class="mb-1 ml-4">${item}</div>`;
            });
            responseHTML += `</div>`;
        }
        
        if (topic.items) {
            responseHTML += `<div class="mb-4"><b>Items Needed:</b>`;
            topic.items.forEach(item => {
                responseHTML += `<div class="mb-1 ml-4">${item}</div>`;
            });
            responseHTML += `</div>`;
        }
        
        if (topic.tools) {
            responseHTML += `<div class="mb-2"><b>🛠️ Tools:</b> ${topic.tools}</div>`;
        }
        
        if (topic.time) {
            responseHTML += `<div class="mb-2"><b>⏱️ Time Required:</b> ${topic.time}</div>`;
        }
        
        if (topic.solution) {
            responseHTML += `<div class="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <b>✅ Solution:</b> ${topic.solution}
            </div>`;
        }
        
        if (topic.warning) {
            responseHTML += `<div class="mb-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <b>⚠️ WARNING:</b> ${topic.warning}
            </div>`;
        }
        
        if (topic.prevention) {
            responseHTML += `<div class="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <b>💡 Prevention:</b> ${topic.prevention}
            </div>`;
        }
        
        if (topic.tip) {
            responseHTML += `<div class="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <b>💡 Tip:</b> ${topic.tip}
            </div>`;
        }
        
        if (topic.emergency) {
            responseHTML += `<div class="mb-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <b>🚨 Emergency:</b> ${topic.emergency}
            </div>`;
        }
        
        if (topic.budget) {
            responseHTML += `<div class="mb-3"><b>💰 Estimated Budget:</b> ${topic.budget}</div>`;
        }
        
        if (topic.savings) {
            responseHTML += `<div class="mb-3"><b>📈 Potential Savings:</b> ${topic.savings}</div>`;
        }
        
        responseHTML += `
                <div class="mt-4 text-xs text-slate-500 dark:text-slate-400 italic">
                    <b>Note:</b> Sentiasa prioritize safety. Jika tak pasti, rujuk professional mechanic.
                </div>
            </div>
        `;
        
        return responseHTML;
    }
    
    const dbMatch = db.find(item => 
        q.includes(item.title.toLowerCase()) || 
        q.includes(item.cat.toLowerCase()) ||
        item.title.toLowerCase().includes(q.substring(0, 10))
    );
    
    if (dbMatch) {
        return `
            <div class="font-bold mb-2 flex items-center gap-2">
                <i class="fas fa-robot"></i> VroomFix AI
            </div>
            <div class="text-sm">
                <div class="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">${dbMatch.title}</div>
                <div class="mb-3"><b>Category:</b> ${dbMatch.cat}</div>
                <div class="mb-3"><b>Steps:</b></div>
                <div class="ml-4 mb-3">${dbMatch.desc.replace(/\n/g, '<br>')}</div>
                ${dbMatch.tools ? `<div class="mb-2"><b>🛠️ Tools:</b> ${dbMatch.tools}</div>` : ''}
                ${dbMatch.time ? `<div class="mb-3"><b>⏱️ Time:</b> ${dbMatch.time}</div>` : ''}
                <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <b>💡 Pro Tip:</b> ${carTips[Math.floor(Math.random() * carTips.length)]}
                </div>
            </div>
        `;
    }
    
    const randomTip = carTips[Math.floor(Math.random() * carTips.length)];
    return `
        <div class="font-bold mb-2 flex items-center gap-2">
            <i class="fas fa-robot"></i> VroomFix AI
        </div>
        <div class="text-sm">
            <b>🤔 Soalan yang menarik!</b>
            <div class="mt-2">Saya cuba faham soalan anda tentang "${question}".</div>
            
            <div class="mt-4 mb-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <b>📚 Saya boleh bantu dengan:</b>
                <div class="mt-2 ml-4">
                    <div>• Maintenance procedures & schedules</div>
                    <div>• Problem diagnosis & solutions</div>
                    <div>• Tool recommendations & usage</div>
                    <div>• Safety guidelines & precautions</div>
                    <div>• General car care tips</div>
                </div>
            </div>
            
            <div class="mt-3">
                <b>Cuba tanya lebih spesifik seperti:</b>
                <div class="mt-2 ml-4 text-sm">
                    <div>"Cara check dan tukar minyak enjin"</div>
                    <div>"Kenapa kereta overheating dan apa nak buat"</div>
                    <div>"Alat asas apa perlu untuk DIY beginner"</div>
                    <div>"Tips jimat petrol setiap bulan"</div>
                </div>
            </div>
            
            <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                ${randomTip}
            </div>
            
            <div class="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Jangan malu-malu tanya lagi! Saya sedia membantu dengan apa-apa tentang kereta! 😊
            </div>
        </div>
    `;
}

function processChat() {
    const inp = document.getElementById('chat-input');
    const msgs = document.getElementById('chat-msgs');
    const question = inp.value.trim();
    
    if(!question) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'user-message chat-message';
    userMsg.innerHTML = `
        <div class="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 rounded-2xl rounded-tr-none shadow">
            <div class="text-xs text-slate-300 mb-1">You</div>
            <div class="text-sm">${question}</div>
        </div>
    `;
    msgs.appendChild(userMsg);
    
    inp.value = '';
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        
        const aiResponse = getAIResponse(question);
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-message chat-message';
        aiMsg.innerHTML = `
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl rounded-tl-none shadow-lg">
                ${aiResponse}
            </div>
        `;
        msgs.appendChild(aiMsg);
        
        msgs.scrollTop = msgs.scrollHeight;
    }, 1000 + Math.random() * 1000);
}