export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch('https://api.gemino.dev/cloud/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok && data.code) {
            return { success: true, code: data.code };
        } else {
            return { success: false, message: data.error || 'Erreur lors de l\'upload.' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}