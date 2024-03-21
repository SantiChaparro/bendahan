const server = require('./src/server');
const { conn } = require('./src/db');
require('dotenv').config();
const clientLoader = require('./src/assets/funtions/loadClient');
const professionalLoader = require('./src/assets/funtions/loadProfessional');
const serviceLoader = require('./src/assets/funtions/loadservice');
const loadProfessionalService = require('./src/assets/funtions/loadProfessionalService');
//const PORT = 3001;
const PORT = process.env.PORT

conn.sync({force: true}).then(()=>{
        

    server.listen(PORT, async()=>{

        await clientLoader();
        await professionalLoader();
        await serviceLoader();
        await loadProfessionalService()

        console.log(`Listening to port ${PORT}`);
    });
  
}).catch(error => console.error(error))