export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    if (((file.size/1024)/1024).toFixed(4) > 200)
        return { success: false, message: 'Le fichie dépasse 200Mb' }

    try {
        const response = await fetch('https://api.gemino.dev/cloud/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.code) {
            return { success: true, code: data.code };
        } else if (data.error) {
            return { success: false, message: data.error };
        } else {
            return { success: false, message: 'Erreur du coté du serveur' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}