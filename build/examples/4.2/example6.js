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
console.log("main handler starting");
function driver(promiseName, flag) {
    console.log(`starting driver(${flag})`);
    (0, promiseMaker_1.default)(promiseName, flag, 10)
        .then(n => {
        console.log(`promise ${promiseName} fulfilled and passed ${n} to its successor`);
        return n + 1;
    })
        .then(m => console.log(`the second then block received ${m}`))
        .catch(n => console.log(`promise ${promiseName} rejected and passed "${n}" to its successor`));
}
function driver2(promiseName, flag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`starting driver2(${flag})`);
            const n = yield (0, promiseMaker_1.default)(promiseName, flag, 10);
            console.log(`promise ${promiseName} fulfilled and passed ${n} to its successor`);
            const m = n + 1;
            console.log(`the second then block received ${m}`);
        }
        catch (n) {
            console.log(`promise ${promiseName} rejected and passed "${n}" to its successor`);
        }
    });
}
console.log("first group");
driver("promise1", true);
driver("promise2", false);
driver2("promise1a", true);
driver2("promise2a", false);
console.log('main handler finished');
