import {Request, Response} from "express";

export default interface UnlikeControllerI {
    findAllUsersThatUnlikedTuit (req: Request, res: Response): void;
    findAllTuitsUnlikedByUser (req: Request, res: Response): void;
    userTogglesTuitUnlikes (req: Request, res: Response): void;
};