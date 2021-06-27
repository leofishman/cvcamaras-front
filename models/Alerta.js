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

const Alerta = model ('alertas', AlertSchema)

module.exports = Alerta