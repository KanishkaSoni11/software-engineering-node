"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const mongoose_1 = __importDefault(require("mongoose"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
// connect to the database
const connectionString = `mongodb+srv://kanishkasoni:kanu17@cluster0.ilo4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose_1.default.connect(connectionString);
// create RESTful Web service API
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log("Here");
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likesController = LikeController_1.default.getInstance(app);
const followsController = FollowController_1.default.getInstance(app);
const bookmarksController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
