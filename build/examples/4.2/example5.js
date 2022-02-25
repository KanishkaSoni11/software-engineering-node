"use strict";
// 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f() {
    doThisNow();
    promiseReturningFunction
        .then(value => onSuccess(value))
        .catch(errmsg => onFailure(errmsg));
}
function f() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            doThisNow();
            const value = yield promiseReturningFunction();
            onSuccess(value);
        }
        catch (errmsg) {
            onFailure(errmsg);
        }
    });
}
function f() {
    doThisNow(); // done in the caller's thread
    makeNewPromise(() => doThisLater()) // the rest is all done in a new thread
        .then(value => onSuccess(value))
        .catch(errmsg => onFailure(errmsg));
}
function f() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            doThisNow();
            const value = yield doThisLater();
            onSuccess(value);
        }
        catch (errmsg) {
            onFailure(errmsg);
        }
    });
}
