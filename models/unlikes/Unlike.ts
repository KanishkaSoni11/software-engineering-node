/**
 * @file Declares Unlike data type representing relationship between
 * users and tuits, as in user likes a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Unlike Represents likes relationship between a user and a tuit,
 * as in a user unlikes a tuit
 * @property {Tuit} tuit Tuit being unliked
 * @property {User} likedBy User liking the tuit
 */

export default interface Unlike {
    tuit: Tuit,
    unLikedBy: User
};