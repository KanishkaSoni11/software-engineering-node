import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsAUser(req: Request, res: Response): void;
    userUnfollowsAUser(req: Request, res: Response): void;
    findUsersFollowed(req: Request, res: Response): void;
    findUsersFollowing(req: Request, res: Response): void;
};