/**
 * @file Controller RESTful Web service API for messages resource
 */

import MessageControllerI from "../interfaces/MessageControllerI";
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

/**
 * @class MessageController Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/sends/:uid1 to create a new message instance for
 *     a given user</li>
 *     <li>GET /api/users/:uid/recd to retrieve all the user instances for received messages</li>
 *     <li>GET /api/users/:uid/send to retrieve all the user instances for sent messages</li>
 *     <li>DELETE /api/users/:uid/deletes/:uid1 to remove a particular message instance</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/recd", MessageController.messageController.findRecdMessages);
            app.get("/api/users/:uid/send", MessageController.messageController.findSentMessages);
            app.post("/api/users/:uid/sends/:uid1", MessageController.messageController.userSendsMessage);
            app.delete("/api/users/:uid/deletes/:uid1", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }


    /**
     * Retrieves all messages received by the user and returns the array of messages
     * @param req Represents request from client
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */

    findRecdMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findRecdMessages(req.params.uid).then(messages => res.json(messages))

    /**
     * Retrieves all messages sent by the user and returns the array of messages
     * @param req Represents request from client
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     **/

    findSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findSentMessages(req.params.uid).then(messages => res.json(messages))


    /**
     * Deletes the message from the database
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(
            req.params.uid, req.params.uid1).then(status => res.send(status));

    /**
     * Creates an instance of the message for both the users
     * @param req Represents request from client, including body
     * containing the JSON object for the new message to be inserted in the
     * database
     * @param res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(
            req.params.uid, req.params.uid1, req.body).then(messages => res.json(messages));



}