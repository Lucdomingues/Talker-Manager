function randomToken(size) {
    let tokenRandom = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i += 1) {
        tokenRandom += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return tokenRandom;
}

module.exports = {
    randomToken,
};