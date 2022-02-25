/**
 * @file Implements DAO managing data storage of messages by user. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Messages from "../models/messages/Messages";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Users
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Uses UserModel to retrieve all user documents from user collection
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findRecdMessages = async (uid: string): Promise<Messages[]> =>
        MessageModel.find({from: uid}).populate("to").exec();

    /**
     * Uses UserModel to retrieve all user documents from user collection
     * @param uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findSentMessages = async (uid: string): Promise<Messages[]> =>
        MessageModel.find({to: uid}).populate("from").exec();

    /**
     * Removes all messages from the user from the database
     * @param uid User's primary key
     * @param uid1 User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    userDeletesMessage = async (uid: string, uid1: string): Promise<any> =>
        MessageModel.deleteOne({from: uid, to: uid1});

    /**
     *
     * Inserts user instance into the database with the message from one user to another
     * @param uid User's primary key
     * @param uid1 User's primary key
     * @param message Message that has to be sent
     * @returns Promise To be notified when user is retrieved from the database
     */
    userSendsMessage = async (uid: string, uid1: string, message: Messages): Promise<any> =>
        MessageModel.create({...message, from: uid, to: uid1});

}