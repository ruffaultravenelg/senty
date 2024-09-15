import { uploadFile } from './upload.js';
import { downloadFile } from './download.js';

// Handle file uploader
const uploadDiv = document.getElementById('upload');
const fileInput = document.getElementById('fileInput');

// Upload div clicked
uploadDiv.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selected
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        startUpload(file);
    }
});

// Handle drag-and-drop
uploadDiv.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadDiv.classList.add('dragover');
});
uploadDiv.addEventListener('dragleave', () => {
    uploadDiv.classList.remove('dragover');
});

uploadDiv.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadDiv.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    if (file) {
        startUpload(file);
    }
});

// Fonction simulée pour gérer le fichier
const upload_notification = document.getElementById('upload_notification');
const upload_notification_text = document.getElementById('upload_notification_text');
async function startUpload(file) {
    
    // Upload
    let result = await uploadFile(file);

    // Sucess
    if (result.success){
        upload_notification.style.backgroundColor = '';
        upload_notification_text.textContent = result.code.toString().toUpperCase();
    } else {
        upload_notification.style.backgroundColor = 'darkred';
        upload_notification_text.textContent = 'Fichier trop volumineu';
    }

    // Show animation
    upload_notification.className = 'showed';

    // Remove
    setTimeout(() => {
        upload_notification.className = '';
    }, 10000);

}

// Notificatino clicked
upload_notification.onclick = ()=>{
    upload_notification.classList = '';
    copyTextToClipboard(upload_notification_text.textContent);
};

// Copy
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

// Download
const code = document.getElementById('code');
const download_btn = document.getElementById('download_btn');

download_btn.onclick = async ()=>{

    // Try downloading
    let result = await downloadFile(code.value);

    // If error
    if (!result.success){
        code.style.borderColor = 'red';
        setTimeout(() => {
            code.style.borderColor = '';
        }, 3000);
    }

};