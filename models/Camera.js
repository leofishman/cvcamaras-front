const {Schema, model} = require('mongoose')

const CameraSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    idn: {
        type: Number,
    },
    feed: {
        type: String,
    },
    fps: {
        type: Number,
        defaultValue: 1,
    },
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
    frames_capt: {
        type: Number,
        defaultValue: 50,
    },
    active: {
        type: Boolean,
        defaultValue: true,
    },
})

const Camera = model('camera', CameraSchema)

module.exports = Camera