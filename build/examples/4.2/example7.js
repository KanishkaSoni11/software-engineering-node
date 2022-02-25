"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseMaker_1 = __importDefault(require("./promiseMaker"));
function driver(flag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`starting driver(${flag})`);
            const n = yield (0, promiseMaker_1.default)(flag);
            console.log(`myPromise(${flag}) fulfilled and passed ${n} to its successor`);
        }
        catch (n) {
            console.log(`myPromise(${flag}) rejected and passed "${n}" to its successor`);
        }
    });
}
driver(true);
driver(false);
console.log('main thread finished');
