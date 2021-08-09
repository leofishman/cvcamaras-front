const Alerta = require('./models/Alerta')
const Configuraciones = require('./models/Configuraciones')
const { frontEnd } = require('./config')
const nodemailer = require('nodemailer')
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object
let lastIp 

// get server ip address, maybe better to put that in the config file?
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
            lastIp = net.address
        }
    }
}



const  enviarAlertas = async (k) => {
  const alerts = await (Alerta.get_not_sended(k))
  //console.log(alerts)
  if (alerts.length > 0) {
    alerts.forEach(async (alerta) => {
    
      // preparar mail  
      const {asunto, mensaje } = prepararMail(alerta)
      // enviar mail
      const enviar_mail = await enviarMail(asunto, mensaje)
      // setear alerta como enviada
  //    console.log('Alert:', asunto, mensaje, alerta.detections_count)
    });
  } else {
  //  console.log(alerts.length)
  }
} 


function prepararMail(alerta) {

    
/*  let cause = []
   if (alerta.no_facemask_count) cause.push('Sin Barbijo (' + alerta.no_facemask_count + ') ')
    if (alerta.no_hardhat_count) cause.push('Sin Casco (' + alerta.no_hardhat_count + ') ')
    if (alerta.hardhat_count) cause.push(' Con Casco (' + alerta.hardhat_count + ') ')
    if (alerta.facemask_count) cause.push(' Con Barbijo (' + alerta.facemask_count + ') ')

 

    if (alerta._id) {
        site = alerta._id.site
        camera = site + '/' + alerta._id.camera
        querystring = Object.keys(alerta._id)
        .map(key => `${key}=${alerta._id[key]}`)
        .join('&');
    } 
    */  
    const asunto = "Alerta de " + alerta.site + ' (' + alerta.camera + ') - ' + alerta.alert_cause
    const link = frontEnd + '/#/alertas/' + alerta._id

    const mensaje = "<h2>Nueva alerta </h2>"
                  + `<h4>causa:</h4> ${alerta.alert_cause}`+ ` mas info: <a href="${link}">${link}</a>`
                  + `<h4>Fecha:</h4> ${alerta.datetime} <h4>sitio / camara:</h4> ${alerta.site} / ${alerta.camera} <br />`
                  + '<br><br> <img  src="data:image/jpeg;base64,' + alerta.person_crops[0] + '"><img  src="data:image/jpeg;base64,' + alerta.person_crops[1] + '">'
                  


    

    return {asunto, mensaje}
}

async function enviarMail(asunto, mensaje) {
  const configuraciones = await Configuraciones.findOne({});
  if (configuraciones.smtp_enable) {
    let transport = nodemailer.createTransport({
      host: configuraciones.smtp_server,
      port: configuraciones.port,
      auth: {
        user: configuraciones.smtp_user,
        pass: configuraciones.smtp_password
      }
    });
    const message = {
      from: 'alertas@algolabs.ai',
      to: configuraciones.alertas_email,
      subject: asunto,
      html: mensaje
  };
  transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        // update alerta como enviada
        console.log(info);
      }
  });
//    console.log(transport)
  } else {
    console.log('envio de correo no habilado')
  }
  
}

module.exports = enviarAlertas