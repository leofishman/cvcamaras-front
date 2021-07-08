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
        filter.datetimetz = {
            $gte:  fecha_desde, 
            $lte: fecha_hasta, 
        };
        delete filter.fecha_desde;
        delete filter.fecha_hasta;
    }

    filter.detections = [];

    if (filter.barbijo) {
         filter.detections[0] = "mask"
    }
    if (filter.casco) {
        filter.detections[1] = "hard hat"
    }

    if (filter.detections.length == 0) delete filter.detections
    delete filter.casco
    delete filter.chaleco
    delete filter.barbijo
    delete filter.tipo

    return  this.find(filter).limit(20);
}

const Detection = model('detections', DetectionSchema);

module.exports = Detection;