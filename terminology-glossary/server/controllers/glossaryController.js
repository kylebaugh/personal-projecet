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

    }, 

    // getAllTopics: async(req, res) => {
    //     const db = req.app.get('db')
    //     await db.glossary.get_all_topics()
    //     .then((allTopics) => {
    //        return res.status(200).send(allTopics)
    //     }) 
    //     .catch((err) => {
    //         console.log(err)
    //         return res.status(500).send(err)
    //     })
    
    // },

    getTopic: async( req,res) => {
        const db = req.app.get('db')
        const {unit_id} = req.params
        await db.glossary.get_topic(unit_id)
        .then((topicItems) => {
            return res.status(200).send(topicItems)
        })
        .catch(err => {
            console.log(err)
            console.log('getTopic failed')
            res.status(500).send(err)
        })
    },

    topicUnit: async (req,res) => {
        const db = req.app.get('db')
        await db.glossary.unit_topic_join()
        .then((unitTopic) => {
            res.status(200).send(unitTopic)
        })
        .catch((err) => {
            console.log(err)
            console.log('getUnitTopic failed')
            res.status(500).send('asdf')
        })
    }

}