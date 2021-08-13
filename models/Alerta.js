const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const AlertSchema = new Schema({
    site: String,
    alert_cause: Array,
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
    frames: [{ type: Schema.Types.ObjectId, ref: 'Frames' }],
    hardhat_count: Number,
    mean_no_facemask_confidence: Number,
    mean_no_hardhat_confidence: Number,
    no_facemask_count: Number,
    no_hardhat_count: Number,
    person_crops: [{ type: Schema.Types.ObjectId, ref: 'Frames' }],
    enviado: Boolean,
})


AlertSchema.plugin(mongoosePaginate);

AlertSchema.statics.queryAlerts = async function(filter, options) {

    if (!options) options = {}
    if (!filter) filter = {}
    options.select = [
                '_id', 'site', 'alert_cause', 'camera', 'person', 'datetime','detections_count',
                 'facemask_count', 'hardhat_count','mean_no_facemask_confidence',
                 'mean_no_hardhat_confidence','no_facemask_count','no_hardhat_count', 'enviada', 'person_crops'
                ]
    
    options.sort = {datetime: -1}      

    if (filter.fecha_desde) {
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



    } else if (filter._id){
       /*     filter._id.day = parseInt(filter._id.day)
            filter._id.hour = parseInt(filter._id.hour)
            filter._id.interval = parseInt(filter._id.interval)
            filter._id.minute = parseInt(filter._id.minute)
            filter._id.month = parseInt(filter._id.month)
            filter._id.person = parseInt(filter._id.person)
            filter._id.year = parseInt(filter._id.year)            
        */
       console.log(filter)
    } 
   

    const result = await this.paginate(filter, options, function (err, resultado) {
        return resultado;
    })
    return [result,filter];
}

AlertSchema.statics.get_person_crops = async function (id) {

  //  const datetime = new Date(id.datetime)
  //  const opciones = {datetime: datetime}
    const result = await this.findOne(id)
  //  console.log(105, id, result)
    /* this will shrink person_crops array to 20 images max */
    let skip_crop
    if ( result.person_crops.length > 20) {
        skip_crop = Math.floor((result.person_crops.length / 15))
        const result_shrinked = result.person_crops.filter(function(value, index) {
            return (index + 1) % skip_crop == 0;
        });
        return result_shrinked.slice(0,20)      
    } 
    return result.person_crops.slice(0,20)

}

AlertSchema.statics.get_not_sended = async function(k) {
    const alert = this.find(
        {enviado:false},
        {alert_cause:1, site:1, camera:1, datetime:1, 
         detections_count:1, no_facemask_count: 1, 
         no_hardhat_count:1, person_crops: {$slice: -2} 
        }).limit(k)

    return alert
}

AlertSchema.statics.getAlertsByCamera = async function(camera, site) {
    const filter = {camera:camera, site: site, enviado:false}
    const alertas = this.find(filter,  {alert_cause:1, _id:0})
    const alert_cause = this.aggregate([{
            $group:{alert_cause:"$alert_cause",Total:{$sum:1}}}
        ]);
    console.log(132,alert_cause)
    return alertas
}

const Alerta = model ('alerts', AlertSchema)

module.exports = Alerta