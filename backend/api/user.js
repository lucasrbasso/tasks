const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = (req, res) => {

            const user = {...req.body}
            
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

            user.password = encryptPassword(user.password)
            user.email.toLowerCase()
            delete user.confirmPassword

            app.db('users')
                .insert(user)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).json(err))
    }

    return { save }
}