const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = (req, res) => {

            const user = {...req.body}
            user.password = encryptPassword(user.password)

            app.db('users')
                .insert(user)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).json(err))
    }

    return { save }
}