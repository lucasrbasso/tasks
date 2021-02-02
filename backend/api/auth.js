const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
    const signin = async (req, res) => {
        const login = { ...req.body };

        if (!login.email || !login.password) {
            return res.status(400).send("Dados incompletos");
        }

        const user = await app
            .db("users")
            .where({ email: login.email })
            .first();

        if (user) {
            const isMatch = bcrypt.compareSync(
                login.password,
                user.password
            );

            if (!isMatch) return res.status(401).send("Email/Senha inválidos!");

            const payload = { id: user.id };
            res.json({
                name: user.name,
                email: user.email,
                token: jwt.encode(payload, authSecret),
            });
        } else {
            res.status(400).send("Usuário não cadastrado");
        }
    };

    return { signin };
};
