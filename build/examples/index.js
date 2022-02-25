"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseMaker_1 = __importDefault(require("./promiseMaker"));
console.log("main handler starting");
// create a new promise, labeled "promise100",
// and throw it in the pool
(0, promiseMaker_1.default)("promise100", true, 10);
// finish the main handler
console.log('main handler finished');
// and go on to run any handlers left in the pool
