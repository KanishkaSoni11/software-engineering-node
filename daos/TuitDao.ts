/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";

import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */

    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {
    }

    /**
     * Uses UserModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */

    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Uses UserModel to retrieve single tuit document from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */

    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Uses UserModel to retrieve all tuits document from tuits collection
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts user instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates tuit with new values in database
     * @param uid User's primary key
     * @param tuit Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});

    /**
     * Removes all users from the database. Useful for testing
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});
}