const mongoose = require('mongoose')
const mongooseTypePhone = require('mongoose-type-phone')
require('mongoose-type-email')

const configuracionesSchema = new mongoose.Schema ({
  alertas_email: { type: mongoose.SchemaTypes.Email, default: 'alertas@mail.com'},
  alertas_telefono: mongoose.SchemaTypes.Number, // TODO: Change to phone type
  alertas_periodicidad: mongoose.SchemaTypes.Number,
})

const Configuraciones = mongoose.model('configuraciones', configuracionesSchema)

module.exports = Configuraciones