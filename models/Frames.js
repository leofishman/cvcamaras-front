const stringify = require("fast-json-stable-stringify")
const { model, Schema } = require("mongoose")

const FrameSchema = new Schema({
  _id: String,
  datetime: String,
  frame_jpg: Buffer,
  source: String,
});

FrameSchema.statics.queryFrames = async function(filter) {
    
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
      filter.datetimet = {
          $gte:  fecha_desde, 
          $lte: fecha_hasta, 
      };
      delete filter.fecha_desde;
      delete filter.fecha_hasta;
  }
  
  const frames = await this.find().limit(1);
//  let frame_jpg = await frames.frame_jpg.toString('hex');
 // console.log(33, frame_jpg)
  return  frames;
}
const Frames = model('frames', FrameSchema);

module.exports = Frames;