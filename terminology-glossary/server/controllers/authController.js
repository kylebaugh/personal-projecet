const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

const {emailUser, emailPass, registerAdminKey} = process.env

module.exports = {
    register: async (req, res) => {
        // let testAccount = await nodemailer.createTestAccount()
        let transporter = nodemailer.createTransport({
            service:'gmail',
            secure: false,

            auth: {
                user: emailUser,
                pass: emailPass
            }
        })


        const db = req.app.get('db')
        const {firstName, lastName, registerEmail, registerPassword, adminKey} = req.body
        

        let info = {
            from: 'kyle.devmountain@gmail.com',
            to: `${registerEmail}`,
            subject: "Welcome!",
            text: `Hello ${firstName}!
            
            Welcome to your DevMountain Unit Glossary! 

            Here are your Login credentials.

            Username: ${registerEmail}
            Password: ${registerPassword}
            
            If you have questions, email Stuart.
            
            Thanks!`,
        }

        // console.log("Message sent: %s", info.messageId)
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
        

        const [user] = await db.auth.check_email(registerEmail)
        // console.log(user)
            if(user){
                // alert('Email already taken')
                return res.status(409).send('Email already taken')
            }
            if (adminKey !== registerAdminKey && adminKey !== ''){
                // alert('Admin Key Incorrect')
                return res.status(401).send('Admin Key Incorrect')
            }
            if(adminKey === registerAdminKey){
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(registerPassword, salt)
                const [admin] = await db.auth.register_admin
                    (firstName, lastName, registerEmail, hash, 'lastJediSucked')
                const [user] = await db.auth.check_email(registerEmail)

                transporter.sendMail(info, function(error, info){
                    if(error){
                        console.log(error)
                        console.log('send mail error')
                    }else{
                        console.log('Email sent:' + info.response)
                    }
                })

                const isAuthenticated = bcrypt.compareSync(registerPassword, user.password)
                delete user.password
                req.session.user = user 
                return res.status(200).send(req.session.user)}

            if(adminKey === ''){
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(registerPassword, salt)
                const [user] = await db.auth.register_user(firstName, lastName, registerEmail, hash, 'user')
                const [asdf] = await db.auth.check_email(registerEmail)
                
                transporter.sendMail(info, function(error, info){
                    if(error){
                        console.log(error)
                        console.log('send mail error')
                    }else{
                        console.log('Email sent:' + info.response)
                    }
                })
                
                const isAuthenticated = bcrypt.compareSync(registerPassword, asdf.password)
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
            // alert('Email not found')
            return res.status(409).send('Email not found')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            // alert('Password incorrect')
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