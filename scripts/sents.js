import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm';

// Save a sents
export function saveSents(filename, code) {
    
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15); // Date actuelle + 15 minutes
    const sents = {
        filename,
        code,
        expiration: expirationDate.getTime() // Stockage du timestamp pour comparaison
    };

    // Sauvegarder l'objet sents dans un cookie
    let currentSents = jsCookie.get('sents');
    currentSents = currentSents ? JSON.parse(currentSents) : [];

    // Ajout du nouveau sents à la liste
    currentSents.push(sents);

    // Sauvegarder la liste actualisée dans le cookie
    jsCookie.set('sents', JSON.stringify(currentSents));
}

// Retrieve all saved local sents that are not expired
export function getSents() {
    removeExpiredSents();
    const currentSents = JSON.parse(jsCookie.get('sents')) || [];
    const now = new Date().getTime();

    return currentSents.map(sents => {
        const timeLeft = sents.expiration - now;
        if (timeLeft > 0) {
            const minutesLeft = Math.floor(timeLeft / 60000); // Convertir en minutes
            if (minutesLeft == 0)
                return { ...sents, expireIn: `Expire maintenant` };
            else
                return { ...sents, expireIn: `${minutesLeft} min` };
        } else {
            return { ...sents, expireIn: "Expiré" };
        }
    });
}


// Remove all expired sents
function removeExpiredSents() {
    let currentSents = jsCookie.get('sents');
    currentSents = currentSents ? JSON.parse(currentSents) : [];

    const now = new Date().getTime();

    // Filtrer les sents non-expirés
    const validSents = currentSents.filter(sents => now < sents.expiration);

    // Sauvegarder les sents non-expirés dans le cookie
    jsCookie.set('sents', JSON.stringify(validSents));
}
