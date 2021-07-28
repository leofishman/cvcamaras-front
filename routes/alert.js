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
    let opciones = {};
    if (req.body) {
        opciones = req.body.opciones;
    }
    try {
        const person_crops = await Alerta.get_person_crops(opciones); 
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
    let pagination = {}
    if (req.body.opciones) {
       pagination = req.body.opciones.pagination;
       if (req.body.opciones.filter) {
          filter = req.body.opciones.filter; 
       } 
    }
    try {
        const data = await Alerta.queryAlerts(filter, pagination); 
        if (!data) {
            throw new Error('No hay alertas')
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router
