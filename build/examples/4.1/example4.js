"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseMaker_1 = __importDefault(require("../promiseMaker"));
console.log("main handler starting");
// p1 will be rejected
const p1 = (0, promiseMaker_1.default)("p1", false, 10);
const p2 = (0, promiseMaker_1.default)("p2", true, 20);
// p3 results in an unhandled error
const p3 = p1.then(n => {
    console.log(`p1 passed ${n} to its callback`);
});
// and p4 is never run
const p4 = p3.catch((e) => {
    console.log(`p3 was rejected; the rejection message was "${e}"`);
});
console.log("main handler finishing\n");
