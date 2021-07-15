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

    //    frames.forEach(element => {
        var thumb = new Buffer(frames.frame_jpg).toString('base64');
            //const frame_jpg = frames.frame_jpg.toString('base64')
//console.log(30,  frame_jpg)
     //   });
 //     res.contentType('image/jpg');
     
    //   res.render(thumb);
        res.status(200).json(thumb)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


/*
app.get('/', function(req, res) {
    console.log("Get cake function");
    model.find(function (err, doc) {
        if (err) return next(err);
    var base64 = (doc[0].img.data.toString('base64'));
     res.send(base64);        
    });
});
*/
module.exports = router
