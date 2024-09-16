import { uploadFile } from './upload.js';
import { downloadFile } from './download.js';
import { saveSents, getSents } from './sents.js';

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
        saveSents(file.name, result.code.toString().toUpperCase());
        upload_notification.style.backgroundColor = '';
        upload_notification_text.textContent = result.code.toString().toUpperCase();
    } else {
        upload_notification.style.backgroundColor = 'darkred';
        upload_notification_text.textContent = result.message;
    }

    // Show animation
    upload_notification.className = 'showed';

    // Remove
    setTimeout(() => {
        upload_notification.className = '';
    }, 10000);

    // Update "my sents" display
    updateSentsDisplay();

}

// Notification clicked
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

    // Update "my sents" display
    updateSentsDisplay();

};

// Load sents
const sents_container = document.getElementById('sents_container');
const no_sents = document.getElementById('no_sents');
function updateSentsDisplay() {
    
    // Remove all sents
    sents_container.innerHTML = '';
    
    // Get new ones
    const sents = getSents();
    
    // Show "no sents" message ?
    if (sents.length === 0){
        no_sents.hidden = false;
        return;
    }
    no_sents.hidden = true;

    // Add each sents
    sents.forEach(sent => {
    
        // Create html nodes
        const div = document.createElement('div');
        div.className = 'sent';
        sents_container.appendChild(div);

        const info = document.createElement('div');
        div.appendChild(info);
    
        const filename = document.createElement('p');
        filename.textContent = sent.filename;
        info.appendChild(filename);
    
        const code = document.createElement('p');
        code.textContent = sent.code;
        info.appendChild(code);
    
        const expire = document.createElement('p');
        expire.textContent = sent.expireIn;
        div.appendChild(expire);
       
        // On click -> download
        div.onclick = ()=>{
            downloadFile(sent.code);
        };

    });

}
updateSentsDisplay()