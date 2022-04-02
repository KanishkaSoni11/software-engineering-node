import UnlikeDaoI from "../interfaces/UnlikeDaoI";
import UnlikeModel from "../mongoose/unlikes/UnlikeModel";
import Unlike from "../models/unlikes/Unlike";

/**
 * @class UnLikeDao Implements Data Access Object managing data storage
 * of Users
 * @property {UnLikeDao} unlikeDao Private single instance of MessageDao
 */
export default class UnlikeDao implements UnlikeDaoI {
    private static unlikeDao: UnlikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns UnLikeDao
     */
    public static getInstance = (): UnlikeDao => {
        if (UnlikeDao.unlikeDao === null) {
            UnlikeDao.unlikeDao = new UnlikeDao();
        }
        return UnlikeDao.unlikeDao;
    }

    private constructor() {
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuit collection
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */

    findAllUsersThatUnlikedTuit = async (tid: string): Promise<Unlike[]> =>
        UnlikeModel
            .find({tuit: tid})
            .populate("unLikedBy")
            .exec();
    /**
     * Uses TuitModel to retrieve single tuit document from tuit collection
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */

    findAllTuitsUnlikedByUser = async (uid: string): Promise<Unlike[]> =>
        UnlikeModel
            .find({unLikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();
    /**
     * Inserts an instance of tuit and the user into the database
     * @param uid User's primary key
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */

    findUserUnLikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.findOne({tuit: tid, unLikedBy: uid});
    /**
     * Uses TuitModel to retrieve all tuit documents from users collection
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */

    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.create({tuit: tid, unLikedBy: uid});
    /**
     * Removes the likes from the user from the database for the tuit
     * @param uid User's primary key
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */

    countHowManyUnLikedTuit = async (tid: string): Promise<any> =>
        UnlikeModel.count({tuit: tid});
    /**
     * Uses Like Model to count the number of likes on that tuit.
     * @param tid tuit id
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.deleteOne({tuit: tid, unLikedBy: uid});
}