"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const CourseController_1 = __importDefault(require("./controllers/CourseController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const mongoose_1 = __importDefault(require("mongoose"));
var cors = require('cors');
// build the connection string
// const PROTOCOL = "mongodb+srv";
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const HOST = "cluster0.m8jeh.mongodb.net";
// const DB_NAME = "myFirstDatabase";
// const DB_QUERY = "retryWrites=true&w=majority";
// const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// // connect to the database
// mongoose.connect(connectionString);
const connectionString = `mongodb+srv://kanishkasoni:kanu17@cluster0.ilo4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose_1.default.connect(connectionString);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.get('/', (req, res) => res.send('Welcome!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
// create RESTful Web service API
const courseController = new CourseController_1.default(app);
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likesController = LikeController_1.default.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
