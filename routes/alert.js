const { Router } = require('express')
const User = require('../models/User')
const Alerta = require('../models/Alerta')

const router = Router()

function ensureLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Not authenticated' })
    }
    next()
}



router.post('/person_crops', ensureLogin, async(req, res) => {
    let filter = {};
    if (req.body) {
        filter = req.body.opciones;
    }
    try {
        const person_crops = await Alerta.get_person_crops(filter); 
        if (!person_crops) {
            throw new Error('No hay recortes')
        }
        res.status(200).json(person_crops)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/',ensureLogin, async(req, res) => {
    let filter = {};
    let opciones = {}
    if (req.body.opciones) {
       opciones = req.body.opciones;
    }
    try {
        const alertas = await Alerta.queryAlerts(filter, opciones); 
        if (!alertas) {
            throw new Error('No hay alertas')
        }
        res.status(200).json(alertas)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router
