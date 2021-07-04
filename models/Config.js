const {Schema, model} = require('mongoose');

const ConfigSchema = new Schema({
  key: {
      type: String,
  },
  value: {
      type: Schema.Types.Mixed,
  },
});

const Config = model('settings', ConfigSchema);

module.exports = Config;