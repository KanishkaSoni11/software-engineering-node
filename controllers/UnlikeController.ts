/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import UnlikeDao from "../daos/UnlikeDao";
import UnlikeControllerI from "../interfaces/UnlikeControllerI";
import TuitDao from "../daos/TuitDao";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {UnlikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {UnlikeController} UnlikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class UnlikeController implements UnlikeControllerI {
    private static unlikeDao: UnlikeDao = UnlikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static unlikeController: UnlikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): UnlikeController => {
        if (UnlikeController.unlikeController === null) {
            UnlikeController.unlikeController = new UnlikeController();
            app.get("/api/users/:uid/unlikes", UnlikeController.unlikeController.findAllTuitsUnlikedByUser);
            app.get("/api/tuits/:tid/unlikes", UnlikeController.unlikeController.findAllUsersThatUnlikedTuit);
            app.put("/api/users/:uid/unlikes/:tid", UnlikeController.unlikeController.userTogglesTuitUnlikes);
        }
        return UnlikeController.unlikeController;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatUnlikedTuit = (req: Request, res: Response) =>
        UnlikeController.unlikeDao.findAllUsersThatUnlikedTuit(req.params.tid)
            .then(unlikes => res.json(unlikes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsUnlikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        UnlikeController.unlikeDao.findAllTuitsUnlikedByUser(userId)
            .then(unlikes => {
                const likesNonNullTuits = unlikes.filter(unlikes => unlikes.tuit);
                const tuitsFromUnlikes = likesNonNullTuits.map(unlikes => unlikes.tuit);
                res.json(tuitsFromUnlikes);
            });
    }


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userTogglesTuitUnlikes = async (req: Request, res: Response) => {
        const unlikeDao = UnlikeController.unlikeDao;
        const tuitDao = UnlikeController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyUnUnlikedTuit = await unlikeDao.findUserUnLikesTuit(userId, tid);
            const howManyUnUnlikedTuit = await unlikeDao.countHowManyUnLikedTuit(tid);
            let tuit = await tuitDao.findTuitById(tid);
            if (userAlreadyUnUnlikedTuit) {
                await unlikeDao.userLikesTuit(userId, tid);
                tuit.stats.unlikes = howManyUnUnlikedTuit - 1;
            } else {
                await UnlikeController.unlikeDao.userUnlikesTuit(userId, tid);
                tuit.stats.unlikes = howManyUnUnlikedTuit + 1;
            };
            await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

};