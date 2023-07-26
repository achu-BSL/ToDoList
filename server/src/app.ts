import express from 'express';
import cors from 'cors';

import { connect } from './database/connect.db.js';
import router from './routes/todo.route.js';
import { errorHandler } from './middleware/errorHandler.midleware.js';

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