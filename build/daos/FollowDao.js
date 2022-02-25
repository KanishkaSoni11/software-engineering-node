"use strict";
/**
 * @file Implements DAO managing data storage of users that are followed. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
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
const FollowModel_1 = __importDefault(require("../mongoose/follows/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Users
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * Uses UserModel to retrieve single user document from user collection
         * @param uid User's Primary key
         */
        this.findUsersFollowed = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.find({ userFollowed: uid }).populate("userFollowing").exec(); });
        /**
         * Uses UserModel to retrieve single user document from user collection
         * @param uid User's Primary key
         */
        this.findUsersFollowing = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.find({ userFollowing: uid }).populate("userFollowed").exec(); });
        /**
         * Inserts follow instance into the database
         * @param uid User's Primary key
         * @param uid1 User's Primary key
         */
        this.userFollowsAUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ userFollowed: uid, userFollowing: uid1 }); });
        /**
         * Removes message from the database for respective users
         * @param uid User's Primary key
         * @param uid1 User's Primary key
         */
        this.userUnfollowsAUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ userFollowed: uid, userFollowing: uid1 }); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
