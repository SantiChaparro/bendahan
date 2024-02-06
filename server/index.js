const server = require('./src/server');
const { conn } = require('./src/db');
require('dotenv').config();
const clientLoader = require('./src/controllers/loadClient');
const professionalLoader = require('./src/controllers/loadProfessional');
const serviceLoader = require('./src/controllers/loadservice');
//const PORT = 3001;
const PORT = process.env.PORT

conn.sync({force: true}).then(()=>{
        

    server.listen(PORT, async()=>{

        await clientLoader();
        await professionalLoader();
        await serviceLoader();

        console.log(`Listening to port ${PORT}`);
    });
  
}).catch(error => console.error(error))