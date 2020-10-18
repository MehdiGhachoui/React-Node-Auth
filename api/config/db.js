const {
  MONGO_HOST = 'localhost',
  MONGO_DATABASE = 'node_auth'
} = process.env


module.exports = {

   MONGO_URI : `mongodb://${MONGO_HOST}/${MONGO_DATABASE}` ,

   MONGO_OPTIONS: {

    useNewUrlParser: true,
    useUnifiedTopology: true

  }

}
