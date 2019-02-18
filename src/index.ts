import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
// Routers
import avs from './services/avs';
import customAvs from './services/custom_avs';
import defaultAvs from './services/default_avs';
import healthCheck from './services/health_check';
import unavs from './services/unavailabilities';

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('combined'));
// TODO Add authentication middleware

// Mongoose
const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-atvfz.mongodb.net/test?retryWrites=true`;
mongoose.set('debug', true);
mongoose.connect(mongoURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
// tslint:disable-next-line: no-console
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.use('/health_check', healthCheck);
app.use('/default_avs', defaultAvs);
app.use('/custom_avs', customAvs);
app.use('/unavs', unavs);
app.use('/avs', avs);

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
