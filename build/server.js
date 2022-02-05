"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');
const app = (0, express_1.default)();
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
const userController = new UserController_1.default(app, new UserDao_1.default());
const PORT = 4000;
app.listen(process.env.PORT || PORT);
