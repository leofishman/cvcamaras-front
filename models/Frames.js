const stringify = require("fast-json-stable-stringify")
const { model, Schema} = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

const FrameSchema = new Schema({
  camera: String,
  datetime: String,
  head_crop: {
    data: Buffer,
    contentType: String
  },
  person_crop: {
    data: Buffer,
    contentType: String
  },  
  frame_jpg:   {
    data: Buffer,
    contentType: String
  },
  site: String,  
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
      filter.datetime = {
          $gte:  fecha_desde, 
          $lte: fecha_hasta, 
      };
      delete filter.fecha_desde;
      delete filter.fecha_hasta;
  }
  
  const frames = await this.find().limit(1);
//  let frame_jpg = await frames.frame_jpg.toString('hex');
  //console.log(33, frames[0])
  return  frames[0]._doc;
}


FrameSchema.statics.get_person_crops = async function (opciones) {

  let person_crops

  if (opciones.crops) {
    const array_id = opciones.crops.map(s => new ObjectId(s))
    const query =  { _id : { $in : array_id } } 

    person_crop = this.find(query).limit(5);
    return person_crop
    if ( person_crop.length > 20) {
        skip_crop = Math.floor((person_crop.length / 15))
        const result_shrinked = person_crop.filter(function(value, index) {
            return (index + 1) % skip_crop == 0;
        });
        return result_shrinked.slice(0,20)      
    } 
    return person_crop.slice(0,20)
  } 
}

const Frames = model('frames', FrameSchema);

module.exports = Frames;