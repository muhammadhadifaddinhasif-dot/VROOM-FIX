// PDF Functions
function printToPDF() {
    const btn = document.getElementById('print-pdf-btn');
    const originalText = btn.innerHTML;
    
    // Tunjukkan loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    btn.disabled = true;
    
    // Dapatkan data dari detail page
    const title = document.getElementById('detail-title').textContent;
    const category = document.getElementById('detail-category').textContent;
    const date = document.getElementById('detail-date').textContent;
    const description = document.getElementById('detail-description').innerHTML;
    const tools = document.getElementById('detail-tools').innerHTML;
    const time = document.getElementById('detail-time').innerHTML;
    
    // Dapatkan tips jika ada
    const tipsList = document.getElementById('detail-tips');
    let tipsHTML = '';
    if (tipsList) {
        tipsHTML = tipsList.innerHTML;
    }
    
    // Dapatkan media content jika ada
    const mediaContainer = document.getElementById('detail-media');
    let mediaHTML = '';
    if (mediaContainer && mediaContainer.innerHTML.trim() !== '') {
        mediaHTML = mediaContainer.innerHTML;
    }
    
    // Buat temporary HTML untuk PDF
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.padding = '40px';
    tempDiv.style.background = 'white';
    tempDiv.style.color = 'black';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    
    tempDiv.innerHTML = `
        <div style="margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h1 style="color: #1e40af; font-size: 28px; margin: 0 0 10px 0;">${title}</h1>
                    <div style="background: #dbeafe; color: #1e40af; display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                        ${category}
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 14px; color: #666;">VroomFix Elite</div>
                    <div style="font-size: 12px; color: #999;">DIY Mechanic Portal</div>
                </div>
            </div>
            <div style="color: #666; font-size: 14px; margin-bottom: 20px;">
                <i class="fas fa-calendar-alt"></i> Created: ${date}
            </div>
        </div>
        
        ${mediaHTML ? `
        <div style="margin-bottom: 30px; border: 1px solid #e5e7eb; padding: 20px; border-radius: 15px;">
            <h3 style="color: #374151; font-size: 18px; margin-bottom: 15px;">
                <i class="fas fa-images" style="color: #3b82f6;"></i> Media Reference
            </h3>
            ${mediaHTML.replace(/class="[^"]*"/g, '').replace(/style="[^"]*"/g, 'style="max-width: 100%;"')}
        </div>
        ` : ''}
        
        <div style="margin-bottom: 30px;">
            <h3 style="color: #374151; font-size: 18px; margin-bottom: 15px;">
                <i class="fas fa-list-ol" style="color: #3b82f6;"></i> Step-by-Step Solution
            </h3>
            <div style="color: #4b5563; line-height: 1.6;">
                ${description.replace(/<br\s*\/?>/g, '<br>')}
            </div>
        </div>
        
        <div style="background: #eff6ff; padding: 20px; border-radius: 15px; margin-bottom: 30px; border: 1px solid #dbeafe;">
            <h4 style="color: #1e40af; font-size: 16px; margin-bottom: 15px;">
                <i class="fas fa-lightbulb" style="color: #3b82f6;"></i> Additional Tips
            </h4>
            <div style="color: #4b5563; font-size: 14px;">
                ${tipsHTML || `
                <div style="display: flex; align-items: start; gap: 10px; margin-bottom: 10px;">
                    <i class="fas fa-check" style="color: #10b981;"></i>
                    <span>Make sure you read all steps before starting</span>
                </div>
                <div style="display: flex; align-items: start; gap: 10px; margin-bottom: 10px;">
                    <i class="fas fa-check" style="color: #10b981;"></i>
                    <span>Use appropriate safety equipment</span>
                </div>
                <div style="display: flex; align-items: start; gap: 10px;">
                    <i class="fas fa-check" style="color: #10b981;"></i>
                    <span>If unsure, consult a professional mechanic</span>
                </div>
                `}
            </div>
        </div>
        
        <div style="display: flex; gap: 20px; margin-bottom: 30px;">
            <div style="flex: 1; background: #f9fafb; padding: 20px; border-radius: 15px; border: 1px solid #e5e7eb;">
                <h4 style="color: #374151; font-size: 16px; margin-bottom: 10px;">
                    <i class="fas fa-tools" style="color: #3b82f6;"></i> Required Tools
                </h4>
                <div style="color: #6b7280; font-size: 14px;">
                    ${tools.replace(/<p>/g, '').replace(/<\/p>/g, '')}
                </div>
            </div>
            
            <div style="flex: 1; background: #f9fafb; padding: 20px; border-radius: 15px; border: 1px solid #e5e7eb;">
                <h4 style="color: #374151; font-size: 16px; margin-bottom: 10px;">
                    <i class="fas fa-clock" style="color: #3b82f6;"></i> Time Required
                </h4>
                <div style="color: #6b7280; font-size: 14px;">
                    ${time.replace(/<p>/g, '').replace(/<\/p>/g, '')}
                </div>
            </div>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
            <p>Generated by VroomFix Elite | DIY Mechanic Portal</p>
            <p>www.vroomfix.com | Contact: support@vroomfix.com</p>
            <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>
    `;
    
    document.body.appendChild(tempDiv);
    
    // Generate PDF
    setTimeout(() => {
        html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.setFontSize(20);
            pdf.setTextColor(30, 64, 175);
            
            // Add header
            pdf.text("VroomFix Elite - DIY Guide", 105, 15, { align: 'center' });
            pdf.setFontSize(10);
            pdf.setTextColor(107, 114, 128);
            pdf.text("Professional Car Maintenance & Repair Guide", 105, 22, { align: 'center' });
            
            // Add image
            pdf.addImage(imgData, 'PNG', 10, 30, imgWidth, imgHeight);
            
            // Save PDF
            pdf.save(`VroomFix-${title.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.pdf`);
            
            // Clean up
            document.body.removeChild(tempDiv);
            
            // Restore button
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Show success message
            showPDFSuccess();
        }).catch(error => {
            console.error('PDF generation error:', error);
            
            // Restore button
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Show error message
            alert('Failed to generate PDF. Please try again.');
        });
    }, 500);
}

function showPDFSuccess() {
    // Create success toast
    const toast = document.createElement('div');
    toast.id = 'pdf-success-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.right = '30px';
    toast.style.background = '#10b981';
    toast.style.color = 'white';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '15px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 20px;"></i>
        <div>
            <div style="font-weight: bold;">PDF Generated Successfully!</div>
            <div style="font-size: 12px; opacity: 0.9;">Your guide has been downloaded</div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        if (document.getElementById('pdf-success-toast')) {
            document.body.removeChild(toast);
        }
    }, 3000);
}