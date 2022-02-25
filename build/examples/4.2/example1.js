"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseMaker_1 = __importDefault(require("./promiseMaker"));
console.log("main handler starting");
(0, promiseMaker_1.default)("promise1", true, 10)
    .then(n => console.log(`promise1 passed ${n} to its successor`));
(0, promiseMaker_1.default)("promise2", false)
    .then(n => console.log(`promise2 passed ${n} to its successor`));
console.log('main thread finished');
