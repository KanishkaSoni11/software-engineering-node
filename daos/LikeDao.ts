/**
 * @file Implements DAO managing data storage of liked tuits by user. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Users
 * @property {LikeDao} likeDao Private single instance of MessageDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */

    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuit collection
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve single tuit document from tuit collection
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    /**
     * Inserts an instance of tuit and the user into the database
     * @param uid User's primary key
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<Like> =>
        LikeModel.create({tuit: tid, likedBy: uid});
    /**
     * Removes the likes from the user from the database for the tuit
     * @param uid User's primary key
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}