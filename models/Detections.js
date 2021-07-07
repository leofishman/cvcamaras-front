const {Schema, model} = require('mongoose');

const DetectionSchema = new Schema({
    name: String,
    source: String,
    datetimetz: Date,
    source_storage_path: String,
    person: Boolean,
    person_crop: Schema.Types.Mixed,
    detections: Array,
    detections_confidences: Array,
    person_id: Number,
    person_crop_confidence: Number,
    head_crop_confidence: Number,
});

DetectionSchema.statics.queryDetections = function(filter) {

    const fecha_desde = filter.fecha_desde;
    let fecha_hasta = filter.fecha_hasta;
    

    if (!fecha_hasta) {
        fecha_hasta = new Date();
    } else {
        fecha_hasta = new Date(fecha_hasta);
    }
    
    if (fecha_desde) {
            filter.datetimetz = {
            $gte: new Date(fecha_desde), 
            $lte: fecha_hasta
        };
    }
console.log(35,filter)
    return this.find(filter).limit(20);
}

const Detection = model('detections', DetectionSchema);

module.exports = Detection;