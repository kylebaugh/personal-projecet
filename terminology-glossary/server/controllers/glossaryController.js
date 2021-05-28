const bcrypt = require('bcryptjs')

module.exports = {

    getAllUnits: async (req, res) => {
        const db = req.app.get('db')
        await db.glossary.get_all_units()
        .then((allUnits) => {
            return res.status(200).send(allUnits)
        }) 
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })

    },

    getUnit: async (req, res) => {
        const db = req.app.get('db')
        const {unit_id} = req.params
        await db.glossary.get_unit(unit_id)
        .then((unitItems) => {
            return  res.status(200).send(unitItems)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })

    }

}