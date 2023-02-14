const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    next();
};

const emailProperties = (req, res, next) => {
    const regex = /\S+@\S+\.\S+/;
    const validacion = regex.test(req.body.email);
    if (validacion) {
        next();
    } 
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const passwordProperties = (req, res, next) => {
    const NUMBER_MIN = 6;
    const validacion = req.body.password;
    const condicion = validacion.length >= NUMBER_MIN;
    if (condicion) {
        next();
    }
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

module.exports = {
    validateLogin,
    emailProperties,
    passwordProperties,
};