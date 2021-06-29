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

var getQueryParameters = function(query) {
    var result = {};
    for (let q in query) {
        queries = query[q].split("&");
        console.log(18, queries)
        for (var i = 0; i < queries.length; i++) {
            const values = queries[i].split("=");
            if (values[0] === 'fecha_desde'){
               // result['date_alerta'] = {$gt: ISODate(value[1])}
                console.log(21, result,  values[1])
               // result['date_alerta'] = "{gt$: " + values[1] + "}";
            } else if (values[0] && values[1]) {
                result[values[0]] = values[1];
            }
            
        }
    }
    return result;
    
};

router.get('/', ensureLogin, async(req, res) => {
    let filter = getQueryParameters(req.query);
    console.log(40, filter)
    try {
        const alertas = await Alerta.find(filter).limit(10)
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
