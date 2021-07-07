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
var getQueryParameters = function(query) {
    var result = {};
    for (let q in query) {
        queries = query[q].split("&");
        for (var i = 0; i < queries.length; i++) {
            const values = queries[i].split("=");
            if (values[1] != 'false') {
                result[values[0]] = values[1];
            }
        }
    }
    return result;
    
};

router.get('/', ensureLogin, async(req, res) => {
    let filter = getQueryParameters(req.query);

    try {
        const detections = await Detections.queryDetections(filter); 
        if (!detections) {
            throw new Error('No hay detecciones')
        }
        res.status(200).json(detections)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router
