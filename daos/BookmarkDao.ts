/**
 * @file Implements DAO managing data storage of tuits that are bookmarked. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmarks from "../models/bookmarks/Bookmarks";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Users
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */

    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Uses UserModel to retrieve all user documents from user collection
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */

    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmarks[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmarks[]> =>
        BookmarkModel
            .find({tuit: tid})
            .populate("bookmarkedBy")
            .exec();

    /**
     * Inserts an instance of bookmarks into the database
     * @param uid User's primary key
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmarks> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});
    /**
     * Removes the bookmark from the database
     * @param uid User's primary key
     * @param tid Tuit's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});


}