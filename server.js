const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'})
const app = require('./app');

const stringConnect = process.env.DB_URL + process.env.DATABASE_NAME;

mongoose.connect(stringConnect).then(() => {
    console.log('DB connect success');
}).catch(err=>console.log(err));

const port = process.env.PORT || 8088; 
app.listen(port, ()=> {
    console.log(`App đang chạy trên cổng ${port} ...`);
});

