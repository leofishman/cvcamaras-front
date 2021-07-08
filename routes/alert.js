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


router.post('/', ensureLogin, async(req, res) => {
    let filter = {};
    if (req.body.opciones) {
        filter = req.body.opciones;
    }
    try {
        const alertas = await Alerta.queryAlerts(filter); 
        if (!alertas) {
            throw new Error('No hay alertas de' . req.params.tipo)
        }
        res.status(200).json(alertas)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.post('/alertas', ensureLogin, async (req, res) => {
    res.status(200)
})

module.exports = router
