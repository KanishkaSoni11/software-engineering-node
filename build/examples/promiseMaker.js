"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeNewThread(callback) { setTimeout(callback); }
// resolves or rejects depending on the value of the flag
function myPromiseMaker(name, flag, n) {
    console.log(`creating new promise ${name}`);
    return new Promise((fulfill, reject) => {
        makeNewThread(() => {
            console.log(`promise ${name} now running; flag = ${flag}`);
            if (flag) {
                console.log(`promise ${name} now fulfilling with ${n}`);
                // @ts-ignore
                fulfill(n);
            }
            else {
                console.log(`promise ${name} now rejecting`);
                reject(`promise ${name} was rejected`);
            }
        });
    });
}
exports.default = myPromiseMaker;
