import UnlikeDaoI from "../interfaces/UnlikeDaoI";
import UnlikeModel from "../mongoose/unlikes/UnlikeModel";
import Unlike from "../models/unlikes/Unlike";

export default class UnlikeDao implements UnlikeDaoI {
    private static unlikeDao: UnlikeDao | null = null;
    public static getInstance = (): UnlikeDao => {
        if(UnlikeDao.unlikeDao === null) {
            UnlikeDao.unlikeDao = new UnlikeDao();
        }
        return UnlikeDao.unlikeDao;
    }
    private constructor() {}
    findAllUsersThatUnlikedTuit = async (tid: string): Promise<Unlike[]> =>
        UnlikeModel
            .find({tuit: tid})
            .populate("unLikedBy")
            .exec();


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

    findUserUnLikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.findOne({tuit: tid, unLikedBy: uid});
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.create({tuit: tid, unLikedBy: uid});
    countHowManyUnLikedTuit = async (tid: string): Promise<any> =>
        UnlikeModel.count({tuit: tid});

    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.deleteOne({tuit: tid, unLikedBy: uid});
}