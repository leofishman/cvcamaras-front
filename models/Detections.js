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
    return this.find(filter).limit(20);
}

const Detection = model('detections', DetectionSchema);

module.exports = Detection;