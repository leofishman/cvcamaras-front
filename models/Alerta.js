const {Schema, model} = require('mongoose')

const AlertSchema = new Schema({
    _ids_cabeza: {
        type: Array,
    },
    _ids_persona: {
        type: Array,
    },
    barbijo: {
        type: Boolean,
    },
    cam: {
        type: String,
    },
    casco: {
        type: Boolean,
    },
    causa: {
        type: Array,
    },
    chaleco: {
        type: Boolean,
    },
    date_alerta: {
        type: Date,
    },
    date_evento: {
        type: Date,
    },
    enviada: {
        type: Boolean,
    },
    id_alerta: {
        type: Number,
    },
    key:{
        type: String,
    },
    len: {
        type: Number,
    },
    persona: {
        type: Number,
    },
    tipo: {
        type: String,
    },
    uid: {
        type: String,
    },    
})

AlertSchema.statics.queryAlerts = function(filter) {
    console.log(55, filter  )
    let fecha_desde = filter.fecha_desde;
    let fecha_hasta = filter.fecha_hasta;
    if (!fecha_hasta) {
        fecha_hasta = new Date();
    } else {
        fecha_hasta =  new Date(fecha_hasta);
    }
    
    if (fecha_desde) {
        //fecha_desde =  new Date(fecha_desde);
        fecha_desde = 'ISODate(' + fecha_desde + ')'
        fecha_hasta = 'ISODate(' + fecha_hasta + ')'
        filter.date_alerta = {
            $gte:  fecha_desde, 
            $lte: fecha_hasta, 
        };
    }

console.log(72, filter)
    return this.find(filter).limit(20);
}

const Alerta = model ('alertas', AlertSchema)

module.exports = Alerta