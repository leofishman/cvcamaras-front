const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { port, mongoURI } = require('./config')
const transactionsRoutes = require('./routes/transactions')
const authRoutes = require('./routes/auth')
const configRoutes = require('./routes/config')
const alertRoutes = require('./routes/alert')
const detectionsRoute = require('./routes/detections')
const framesRpute = require('./routes/frames')
const path = require('path')
const User = require('./models/User')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const enviarAlertas = require('./enviarAlertas')
const { setInterval } = require('timers')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
var HOST = '0.0.0.0';
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDb database is connected'))
    .catch((err) => console.log(err))

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: 'this is my secret',
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/transactions', transactionsRoutes)
app.use('/api/detections', detectionsRoute)
app.use('/api/auth', authRoutes)
app.use('/api/config',configRoutes)
app.use('/api/alertas', alertRoutes)
app.use('/api/frames', framesRpute)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/public'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
    })
}

app.listen(port, HOST, () => console.log('Express is running at '+ HOST + ' port ' + port))

//setTimeout(function() {enviarAlertas(2)}, 1500)
// TODO: Cambiar a setInterval