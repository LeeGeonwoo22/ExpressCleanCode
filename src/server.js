// require('dotenv').config()
const app = require('./controller/app')
const connectDB = require('./config/connection')
const PORT = 3000


function Server() {
  try {
    if(process.env.DB_MONGO_URI !== undefined){
      return connectDB();
    }
  }catch {
      return app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번에서 작동중입니다.`);
    });
  }
}

Server()



// const app = require('./controller/app')
// const PORT = 3000




