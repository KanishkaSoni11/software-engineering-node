/**
 * @file Declares Message data type representing relationship between
 * users, as in user messages another user
 */
import User from "../users/User";

/**
 * @typedef Messages Represents likes relationship between two users,
 * as in user messages another user
 * @property {User} to User receiving the message
 * @property {User} from User sending the message
 */

export default interface Messages {
    message: string,
    to: User,
    from : User,
    sentOn : Date,
};