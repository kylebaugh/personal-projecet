const bcrypt = require('bcryptjs')
//add adminKey to .env for security
module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {firstName, lastName, email, password, adminKey} = req.body
        const [user] = await db.auth.check_email(email)
            if(user){
                return res.status(409).send('Email already taken')
            }
            if (adminKey !== 'lastJediSucked' && adminKey !== ''){
                return res.status(401).send('Admin Key Incorrect')
            }
            if(adminKey === 'lastJediSucked'){
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const [admin] = await db.auth.register_admin(firstName, lastName, email, hash, 'lastJediSucked')
                const [user] = await db.auth.check_email(email)
                const isAuthenticated = bcrypt.compareSync(password, user.password)
                delete user.password
                req.session.user = user 
                // delete admin.password
                // req.session.user = admin
                return res.status(200).send(req.session.user)}
            if(adminKey === ''){
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const [user] = await db.auth.register_user(firstName, lastName, email, hash, 'user')
                const [asdf] = await db.auth.check_email(email)
                const isAuthenticated = bcrypt.compareSync(password, asdf.password)
                delete asdf.password
                req.session.user = asdf
                return res.status(200).send(req.session.user)
            }
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const [user] = await db.auth.check_email(email)
        if(!user){
            return res.status(409).send('Email not found')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            return res.status(401).send('Password incorrect.')
        }
        delete user.password
        req.session.user = user
        return res.status(200).send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy
        res.status(200).send('Logout complete.')

    },
}