"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseMaker_1 = __importDefault(require("./promiseMaker"));
console.log("main handler starting");
function driver(promiseName, flag) {
    console.log(`starting driver(${promiseName})`);
    (0, promiseMaker_1.default)(promiseName, flag, 10)
        .then(n => {
        console.log(`promise ${promiseName} fulfilled and passed ${n} to its successor`);
        console.log(`the then block of ${promiseName} will now throw an error`);
        throw new Error("my error 1");
    })
        .then(m => console.log(`the second then block received ${m}`))
        .catch(n => console.log(`promise ${promiseName} rejected and passed "${n}" to its successor`));
}
driver("promise1", true);
driver("promise2", false);
console.log('main handler finished');
