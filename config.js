module.exports = {
    port: process.env.PORT || 3500,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
    frontEnd: process.env.frontEnd || 'http://localhost:8080',
}
