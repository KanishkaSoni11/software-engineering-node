
import Follow from "../models/follows/Follows";

export default interface FollowDaoI {
    userFollowsAUser(uid: string, uid1: string) : Promise<Follow>;
    userUnfollowsAUser(uid: string, uid1: string) : Promise<any>;
    findUsersFollowed(uid: string): Promise<Follow[]>;
    findUsersFollowing(uid: string): Promise<Follow[]>;
};