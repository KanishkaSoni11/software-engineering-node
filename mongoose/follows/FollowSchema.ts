/**
 * @file Implements mongoose model to CRUD
 * documents in the follows schema
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follows";
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;