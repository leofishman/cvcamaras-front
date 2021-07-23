const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const AlertSchema = new Schema({
    site: String,
    camera: String,
    person: Number,
    interval: Number,
    minute: Number,
    hour: Number,
    month: Number,
    day: Number,
    year: Number,
    datetime: Date,
    detections_count: Number,
    facemask_count: Number,
    frames: Array,
    hardhat_count: Number,
    mean_no_facemask_confidence: Number,
    mean_no_hardhat_confidence: Number,
    no_facemask_count: Number,
    no_hardhat_count: Number,
    person_crops: Schema.Types.Mixed,
})


AlertSchema.plugin(mongoosePaginate);

AlertSchema.statics.queryAlerts = async function(filter) {

    const options = {
        page: 1,
        limit: 6,
        select: [
                'site', 'camera', 'person','datetime','detections_count',
                 'facemas_count', 'hardhat_count','mean_no_facemask_confidence',
                 'mean_no_hardhat_confidence','no_facemask_count','no_hardhat_count'
                ]
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
        filter.datetime = {
            $gte:  fecha_desde, 
            $lte: fecha_hasta, 
        };
        delete filter.fecha_desde;
        delete filter.fecha_hasta;
    }
    filter.detections = [];

    if (filter.chaleco) {
         filter.detections[0] = "person"
    }
    if (filter.barbijo) {
        filter.detections[1] = "no facemask"
    }
    if (filter.casco) {
        filter.detections[2] = "hard hat"
    }

    if (filter.detections.length == 0) delete filter.detections
    delete filter.casco
    delete filter.chaleco
    delete filter.barbijo

    const result = await this.paginate(filter, options, function (err, resultado) {
        console.log(72, resultado)
        return resultado;
    })
    return result;
}

AlertSchema.statics.get_person_crops = async function (id) {
    const datetime = new Date(id.datetime)
    const opciones = {datetime: datetime}

    const result = await this.findOne(opciones)
    return result.person_crops
}

const Alerta = model ('alerts', AlertSchema)

module.exports = Alerta