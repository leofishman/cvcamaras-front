const { Router } = require('express')
const User = require('../models/User')
const Camera = require('../models/Camera')
const Config = require('../models/Config')
const Configuraciones = require('../models/Configuraciones')

const router = Router()

function ensureLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Not authenticated' })
    }
    next()
}

router.get('/', ensureLogin, async(req, res) => {
    try {
        const configuraciones = await Configuraciones.findOne({});
        if (!configuraciones) {
            throw new Error('No hay configuraciones guardadas');
        }
        res.status(200).json(configuraciones)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.put('/', ensureLogin, async(req, res) =>{
    const filter = {_id: req.body._id}
    let configuraciones = {}
    try {
        if (filter._id) {
             configuraciones = await Configuraciones.findOneAndUpdate(filter, req.body, {new:true})

        } else {
            const configuracionesNuevas = new Configuraciones(req.body)
             configuraciones = await configuracionesNuevas.save()
        }
        console.log(configuraciones)
        if (!configuraciones) {
            throw new Error('Hubo un problema actualizando la configuración')
        }
        res.status(200).json(configuraciones)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/cameras/', ensureLogin, async(req, res) => {
        try {
            const cameras = await Camera.find()
            if (!cameras) {
                throw new Error('No hay camaras configuradas')
            }
            res.status(200).json(cameras)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

})

router.post('/cameras', ensureLogin, async (req, res) => {
    const {
        id, idn, sitio, feed, fps, det_persona, det_barbijo, det_casco, det_chaleco, frames_capt, active
     } = req.body
    const newCamera = new Camera({ id, idn, sitio, feed, fps,det_persona, det_barbijo, det_casco, det_chaleco, frames_capt, active })

    try {
        const camera = await newCamera.save()
        if (!camera) {
            throw new Error('There was an error saving the camera')
        }
        res.status(200).json(camera)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/cameras/update', ensureLogin, async (req, res) => {

    const filter = {_id: req.body._id}
    
    try {

        const camera = await Camera.findOneAndUpdate(filter, req.body, {new:true})
        if (!camera) {
            throw new Error('There was an error updating the camera')
        }
        res.status(200).json(camera)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/cameras/delete/:id', ensureLogin, async(req, res) => {

    const { id } = req.params
    try {

        const camera = await Camera.findById(id)
        if (!camera) {
            throw new Error('There was an error deleting the camera')
        }
        const removed = await camera.remove()
  
        if (!removed) {
            throw new Error('There was a problem deleting the transaction')
        }
        res.status(200).json({ id })

    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    
})

module.exports = router
