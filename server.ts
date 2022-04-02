/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import SessionController from "./controllers/SessionController";
import AuthenticationController from "./controllers/AuthenticationController";
import mongoose from "mongoose";
import GroupController from "./controllers/GroupController";
import UnlikeController from "./controllers/UnlikeController";
const cors = require("cors");
const session = require("express-session");

const connectionString = `mongodb+srv://kanishkasoni:kanu17@cluster0.ilo4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

const app = express();
const whitelist = ["*" , "https://lucent-madeleine-fa169e.netlify.app" ,"http://lucent-madeleine-fa169e.netlify.app"]
const corsOptions = {
    origin: function(origin,callback){
        if(!origin || whitelist.indexOf(origin) !== -1)
            callback(null,true)
        else
            callback(new Error("Not Allowed by Cors"))
    },
    credentials : true,
}

app.use(cors(corsOptions));

let sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: false,
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true
}

app.use(session(sess))
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const unlikeController = UnlikeController.getInstance(app);
SessionController(app);
AuthenticationController(app);
GroupController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
