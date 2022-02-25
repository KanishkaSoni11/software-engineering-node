/**
 * @file Declares Bookmarks data type representing relationship between
 * user and tuit, as in user bookmarks a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in user bookmarks a tuit
 * @property {Tuit} tuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 */

export default interface Bookmarks {
    tuit: Tuit,
    bookmarkedBy: User
};

