const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require('./Routes/authRoute');
const adminRoute = require('./Routes/adminRoute');
const studentRoute = require('./Routes/studentRoute');

dotenv.config({ path: './config.env' });
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api/v1/myschool/auth', authRoute);
app.use('/api/v1/myschool/admin', adminRoute);
app.use('/api/v1/myschool/student', studentRoute);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDb connected.'));

app.listen(process.env.PORT, () => {
  console.log(`App is running in port ${process.env.PORT}...`);
});
