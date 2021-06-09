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
            res.status(500).send('glossary topicUnit Failed')
        })
    }, 

    userItems: async(req,res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        await db.glossary.get_user_items(user_id)
        .then((userItems) => {
            res.status(200).send(userItems)
        })
        .catch((err) => {
            console.log(err)
            console.log('userItems Failed')
            res.status(500).send('userItems failed')
        })
    }, 

    learnList: async (req,res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        await db.glossary.get_learn_list(user_id)
            .then((learnList) => {
                res.status(200).send(learnList)
            })
            .catch(err => {
                console.log(err)
                console.log('learnList failed')
                res.status(500).send('learnList Failed')
            })
    }, 

    removePrint: async (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {glossary_id} = req.params
        await db.glossary.remove_print(user.user_id, glossary_id)
            .then((removed) => {
                // console.log(removed)
                res.status(200).send(removed)
            })
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    },

    addPrint: async(req,res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {glossary_id} = req.params
        await db.glossary.add_print(user.user_id, glossary_id)
            .then((printItem) => {
                res.status(200).send(printItem)
            })
            .catch(err => {
                console.log(err)
                console.log('addPrintFailed')
            })
    }

}