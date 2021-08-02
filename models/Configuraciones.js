const mongoose = require('mongoose');
const mongooseTypePhone = require('mongoose-type-phone')
require('mongoose-type-email');

const configuracionesSchema = new mongoose.Schema ({
  alertas_email: mongoose.SchemaTypes.Email,
  alertas_telefono: mongoose.SchemaTypes.Phone, // TODO: Change to phone type
  alertas_periodicidad: mongoose.SchemaTypes.Number,
  alertas_precision: mongoose.Schema.Types.Number,
  smtp_server: mongoose.SchemaTypes.String,
  smtp_user:mongoose.SchemaTypes.String,
  smtp_password:mongoose.SchemaTypes.String,
  smtp_port:mongoose.SchemaTypes.Number,
  smtp_enable:mongoose.SchemaTypes.Boolean,
  alerta_umbral_detection: Number,
})

const Configuraciones = mongoose.model('configuraciones', configuracionesSchema)

module.exports = Configuraciones