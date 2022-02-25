
import Bookmarks from "../models/bookmarks/Bookmarks";

export default interface BookmarkDaoI{
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmarks[]>;
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmarks[]>;
    userBookmarksTuit (tid: string, uid: string): Promise<any>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
}