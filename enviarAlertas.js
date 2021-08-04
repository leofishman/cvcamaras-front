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
  if (alerts.length > 0) {
    alerts.forEach(async (alerta) => {
    
      // preparar mail  
      const {subject, texto } = prepararMail(alerta)
      // enviar mail
    //  const enviar_mail = await enviarMail(subject, texto)
      // setear alerta como enviada
      console.log('Alert:', subject, texto, alerta.detections_count)
    });
  } else {
    console.log(alerts.length)
  }
} 


function prepararMail(alerta) {
    let cause = alerta.alert_cause
    let link
    let querystring
 /*   if (alerta.no_facemask_count) cause.push('Sin Barbijo (' + alerta.no_facemask_count + ') ')
    if (alerta.no_hardhat_count) cause.push('Sin Casco (' + alerta.no_hardhat_count + ') ')
    if (alerta.hardhat_count) cause.push(' Con Casco (' + alerta.hardhat_count + ') ')
    if (alerta.facemask_count) cause.push(' Con Barbijo (' + alerta.facemask_count + ') ')

  */
    if (alerta._id) {
        site = alerta._id.site
        camera = site + '/' + alerta._id.camera
        querystring = Object.keys(alerta._id)
        .map(key => `${key}=${alerta._id[key]}`)
        .join('&');
    }  
    const subject = "Alerta de " + camera + ' ' + cause.toString()
    if (alerta.datetime) {
      link = frontEnd + '/#/alertas/?' + querystring
    }
    const texto = "Nueva alerta " + cause.toString() + ' querystring: ' + link


    

    return {subject, texto}
}

async function enviarMail(subject, texto) {
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
      subject: subject,
      text: texto
  };
  transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        // update alerta como enviada
    //    console.log(info);
      }
  });
//    console.log(transport)
  } else {
    console.log('envio de correo no habilado')
  }
  var hostName = require('os').networkInterfaces;
  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
  })

 // console.log(server.address())
  
}

module.exports = enviarAlertas