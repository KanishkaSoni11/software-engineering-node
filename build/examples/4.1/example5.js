"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseMaker_1 = __importDefault(require("../promiseMaker"));
console.log("main handler starting");
// p1 will be rejected
const p1 = (0, promiseMaker_1.default)("p1", true, 10);
const p2 = (0, promiseMaker_1.default)("p2", true, 20);
const p3 = p1.then(n => {
    console.log(`callback A says: p1 passed ${n} to me`);
});
const p4 = p1.then(n => {
    console.log(`callback B says: p1 passed ${n} to me, too`);
});
console.log("main handler finishing\n");
