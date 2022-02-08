"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const mongoose_1 = __importDefault(require("mongoose"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
// connect to the database
const connectionString = `mongodb+srv://kanishkasoni:kanu17@cluster0.ilo4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose_1.default.connect(connectionString);
// create RESTful Web service API
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
const userController = new UserController_1.default(app, new UserDao_1.default());
const tuitController = new TuitController_1.default(app, new TuitDao_1.default());
const PORT = 4000;
app.listen(process.env.PORT || PORT);
