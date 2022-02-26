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
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
const TuitModel_1 = __importDefault(require("../mongoose/tuits/TuitModel"));
/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
class TuitDao {
    constructor() {
        /**
         * Uses UserModel to retrieve all tuit documents from tuits collection
         * @returns Promise To be notified when the users are retrieved from
         * database
         */
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find(); });
        /**
         * Uses UserModel to retrieve single tuit document from tuits collection
         * @param {string} uid User's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.findAllTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find({ postedBy: uid }); });
        /**
         * Uses UserModel to retrieve all tuits document from tuits collection
         * @param uid User's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.findTuitById = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(uid)
                .populate("postedBy")
                .exec();
        });
        /**
         * Inserts user instance into the database
         * @param {Tuit} tuit Instance to be inserted into the database
         * @returns Promise To be notified when user is inserted into the database
         */
        this.createTuitByUser = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        /**
         * Updates tuit with new values in database
         * @param uid User's primary key
         * @param tuit Tuit's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.updateTuit = (uid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: uid }, { $set: tuit });
        });
        /**
         * Removes all users from the database. Useful for testing
         * @param uid User's primary key
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.deleteTuit = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ _id: uid }); });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
