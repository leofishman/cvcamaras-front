const { Router } = require('express')
const User = require('../models/User')
const Detections = require('../models/Detections')

const router = Router()

function ensureLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Not authenticated' })
    }
    next()
}
// translate querystring get parameters to mondodb query


router.post('/',  async(req, res) => {
    let filter = {};
    let opciones = {}
    if (req.body.opciones) {
       opciones = req.body.opciones;
    }
    try {
        const detections = await Detections.queryDetections(filter, opciones); 
        if (!detections) {
            throw new Error('No hay detecciones')
        }

        res.status(200).json(detections)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/head',  async(req, res) => {
    let filter = {};
    if (req.body.opciones) {
        filter = req.body.opciones;
    }
    try {
        const detections = await Detections.queryDetections(filter); 

        if (!detections) {
            throw new Error('No hay detecciones')
        }

        let head = detections.docs[0]._doc.head_crop

         res.send(head)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router
