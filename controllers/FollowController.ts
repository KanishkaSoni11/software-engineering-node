/**
 * @file Controller RESTful Web service API for likes resource
 */
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/followedby to retrieve all users that followed a tuit
 *     </li>
 *     <li>POST /api/users/:uid/follows/:uid1 to record that a user follows a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid1 to record that a user
 *     no longer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/follows", FollowController.followController.findUsersFollowing);
            app.get("/api/users/:uid/followedby", FollowController.followController.findUsersFollowed);
            app.post("/api/users/:uid/follows/:uid1", FollowController.followController.userFollowsAUser);
            app.delete("/api/users/:uid/unfollows/:uid1", FollowController.followController.userUnfollowsAUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that followed a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findUsersFollowed = (req: Request, res: Response)=>
        FollowController.followDao.findUsersFollowed(req.params.uid).then(follows => res.json(follows));

    /**
     * Retrieves all users followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followed the users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed
     */
    findUsersFollowing = (req:Request, res:Response)=>
        FollowController.followDao.findUsersFollowing(req.params.uid).then(follows => res.json(follows));

    /**
     * Creates an instance of the follow for both the users
     * @param req Represents request from client, including body
     * containing the JSON object for the new follow to be inserted in the
     * database
     * @param res Represents response to client, including the
     * body formatted as JSON containing the new follow that was inserted in the
     * database
     */
    userFollowsAUser = (req:Request, res:Response)=>
        FollowController.followDao.userFollowsAUser(req.params.uid, req.params.uid1).then(follows => res.json(follows));

    /**
     * Deletes the message from the database
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userUnfollowsAUser = (req:Request, res: Response) =>
        FollowController.followDao.userUnfollowsAUser(req.params.uid, req.params.uid1).then(status => res.send(status));

};
