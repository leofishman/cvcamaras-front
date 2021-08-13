const stringify = require("fast-json-stable-stringify")
const { model, Schema} = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

const FrameSchema = new Schema({
  datetime: String,
  frame_jpg:   {
    data: Buffer,
    contentType: String
  },
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
  //console.log(33, frames[0])
  return  frames[0]._doc;
}


FrameSchema.statics.get_person_crops = async function (opciones) {


  let person_crops

  if (opciones.crops) {
    const array_id = opciones.crops.map(s => new ObjectId(s))
  
    let myid =  ObjectId(opciones.crops[0])
    //myid = myid.toString()
    console.log (51, myid)
    const person = this.find({_id: myid})
    console.log(52, person)
    const query =  { _id : { $in : array_id } } 
    //const query = {_id:myid}
    console.log(52, query)
  
   return person_crops = this.find(query, {_id:0,person_crop:1});
   
  } 
  const id_array = id
    const result = await this.findOne(id)
  //  console.log(105, id, result)
    /* this will shrink person_crops array to 20 images max */
    let skip_crop
    if ( result.person_crops.length > 20) {
        skip_crop = Math.floor((result.person_crops.length / 15))
        const result_shrinked = result.person_crops.filter(function(value, index) {
            return (index + 1) % skip_crop == 0;
        });
        return result_shrinked.slice(0,20)      
    } 
    return result.person_crops.slice(0,20)

}

const Frames = model('frames', FrameSchema);

module.exports = Frames;