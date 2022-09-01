const mongoose = require('mongoose') // import mongoose

const connectDB = async () => { // create connectDB function
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, { // connect to database
      useNewUrlParser: true, // use new url parser
      useUnifiedTopology: true, // use unified topology
      useFindAndModify: false, 
      useCreateIndex: true 
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`) // log success
  } catch (err) { // catch errors
    console.error(err) // log errors
    process.exit(1) // exit with failure
  }
}

module.exports = connectDB // export connectDB
