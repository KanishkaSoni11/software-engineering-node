/**
 * @file Implements DAO managing data storage of users that are followed. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follows";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Users
 * @property {FollowDao} followDao Private single instance of FollowDao
 */

export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */

    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Uses UserModel to retrieve single user document from user collection
     * @param uid User's Primary key
     */
    findUsersFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid}).populate("userFollowing").exec();

    /**
     * Uses UserModel to retrieve single user document from user collection
     * @param uid User's Primary key
     */
    findUsersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid}).populate("userFollowed").exec();


    /**
     * Inserts follow instance into the database
     * @param uid User's Primary key
     * @param uid1 User's Primary key
     */
    userFollowsAUser = async (uid: string, uid1: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid1, userFollowing: uid});

    /**
     * Removes message from the database for respective users
     * @param uid User's Primary key
     * @param uid1 User's Primary key
     */
    userUnfollowsAUser = async (uid: string, uid1: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: uid1});


}