import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";
import mongoose from "mongoose";
import TuitDao from "./daos/TuitDao";
import TuitController from "./controllers/TuitController";

// connect to the database

const connectionString = `mongodb+srv://kanishkasoni:kanu17@cluster0.ilo4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

// create RESTful Web service API
const app = express();
app.use(express.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());


const PORT = 4000;
app.listen(process.env.PORT || PORT);