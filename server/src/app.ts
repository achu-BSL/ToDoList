import express from 'express';
import cors from 'cors';

import { connect } from './database/connect.db';
import router from './routes/todo.route';
import { errorHandler } from './middleware/errorHandler.midleware';

const app: express.Application = express();

connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use('/', router);
app.use(errorHandler);

app.listen(5000, ()=> {
    console.log(`Sever running on port 5000`);
})