/**
 * @file Declares API for Unlikes related data access object methods
 */
import Unlike from "../models/unlikes/Unlike";


export default interface UnlikeDaoI {
    findAllUsersThatUnlikedTuit (tid: string): Promise<Unlike[]>;
    findAllTuitsUnlikedByUser (uid: string): Promise<Unlike[]>;
    userLikesTuit (tid: string, uid: string): Promise<any>;
    userUnlikesTuit (tid: string, uid: string): Promise<Unlike>;
};