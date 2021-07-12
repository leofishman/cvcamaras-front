const { Router } = require('express')
const User = require('../models/User')
const Frames = require('../models/Frames')

const router = Router()

function ensureLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Not authenticated' })
    }
    next()
}
// translate querystring get parameters to mondodb query


//router.post('/', ensureLogin, async(req, res) => {
  router.get('/', async(req, res) => {  
    let filter = {};
    if (req.body.opciones) {
        filter = req.body.opciones;
    }
    try {
        const frames = await Frames.queryFrames(filter); 
        
        if (!frames) {
            throw new Error('No hay frames')
        }

        frames.forEach(element => {
            
            const frame_jpg = element.frame_jpg
console.log(30, element._id, frame_jpg)
        });
     //   res.contentType('image/jpg');
     
     //   res.send(frame_jpg);
        res.status(200).json(frames)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
