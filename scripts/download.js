export async function downloadFile(code) {
    try {
        const response = await fetch(`https://api.gemino.dev/cloud/exist/${code}`);
        const data = await response.json();

        if (data.exists === false) {
            return { success: false };
        } else {
            window.open(`https://api.gemino.dev/cloud/download/${code}`, '_blank');
            return { success: true };
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier:', error);
        return { success: false };
    }
}
