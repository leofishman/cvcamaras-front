const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

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

AlertSchema.plugin(mongoosePaginate);

AlertSchema.statics.queryAlerts = async function(filter) {

    const options = {
        page: 1,
        limit: 6,
      };

    let fecha_desde = filter.fecha_desde;
    let fecha_hasta = filter.fecha_hasta;
    if (!fecha_hasta) {
        fecha_hasta = new Date();
    } else {
        fecha_hasta =  new Date(fecha_hasta);
    }
    if (fecha_desde) {
        fecha_desde = new Date(fecha_desde);
        fecha_hasta = fecha_hasta;
        filter.date_alerta = {
            $gte:  fecha_desde, 
            $lte: fecha_hasta, 
        };
        delete filter.fecha_desde;
        delete filter.fecha_hasta;
    }

    const result = await this.paginate(filter, options, function (err, resultado) {
        return resultado;
    })
    return result;
}


const Alerta = model ('alertas', AlertSchema)

module.exports = Alerta