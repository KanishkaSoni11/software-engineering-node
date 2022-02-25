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
const MessageModel_1 = __importDefault(require("../mongoose/messages/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Users
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Uses UserModel to retrieve all user documents from user collection
         * @param uid User's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.findRecdMessages = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ from: uid }).populate("to").exec(); });
        /**
         * Uses UserModel to retrieve all user documents from user collection
         * @param uid User's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.findSentMessages = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ to: uid }).populate("from").exec(); });
        /**
         * Removes all messages from the user from the database
         * @param uid User's primary key
         * @param uid1 User's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.userDeletesMessage = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ from: uid, to: uid1 }); });
        /**
         *
         * Inserts user instance into the database with the message from one user to another
         * @param uid User's primary key
         * @param uid1 User's primary key
         * @param message Message that has to be sent
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.userSendsMessage = (uid, uid1, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { from: uid, to: uid1 })); });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
