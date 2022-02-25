/**
 * @file Declares Follows data type representing relationship between
 * users, as in user follows another user
 */
import User from "../users/User";
import User1 from "../users/User";

/**
 * @typedef Messages Represents likes relationship between two users,
 * as in user follows another user
 * @property {User} userFollowed User who is followed
 * @property {User} userFollowing User who follows
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User1
};