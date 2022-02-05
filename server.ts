import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');
const app = express();

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = new UserController(app, new UserDao());


const PORT = 4000;
app.listen(process.env.PORT || PORT);