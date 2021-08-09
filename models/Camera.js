const {Schema, model} = require('mongoose')

const CameraSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    feed: {
        type: String,
    },
    det_persona: Boolean,
    det_barbijo: {
        type: Boolean,
        defaultValue: true,
    },
    det_casco: {
        type: Boolean,
        defaultValue: true,
    },
    det_chaleco: {
        type: Boolean,
        defaultValue: false,
    },
    active: {
        type: Boolean,
        defaultValue: true,
    },
    site: String,
})

const Camera = model('camera', CameraSchema)

module.exports = Camera