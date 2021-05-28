const bcrypt = require('bcryptjs')

module.exports = {
    
    addItem: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {name, definition, unit_id} = req.body
        if(!user_id){
            return res.status(511).send('Admin not logged in.')
        }
        console.log(name)
        console.log(definition)
        console.log(unit_id)
        db.unit.add_item(user_id, name, definition, unit_id)
        .then((result) => {
            return res.status(200).send(result)
        }).catch((err) =>{
            res.status(500).send('Item not created. Cry about it.')
        })

    },
    
    deleteItem: async (req, res) => {
        const db = req.app.get('db') 
        const {user_id} = req.session.user
        const {glossary_id} = req.params
        if(!user_id){
            return res.status(511).send('Admin not logged in.')
        }
        db.unit.delete_item(glossary_id)
            .then((updatedUnit) => {
               return res.status(200).send(updatedUnit)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
        
    },
    
    editItem: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {glossary_id} = req.params
        const {name, definition, unit_id} = req.body
        if(!user_id){
            return res.status(511).send('Admin not logged in.')
        }else{
        db.unit.edit_item(glossary_id, name, definition, unit_id)
            .then((updatedItem) => {
                return res.status(200).send(updatedItem)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })}
    },
    
    

}




