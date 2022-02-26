/**
 * @file Implements mongoose model to CRUD
 * documents in the messages schema
 */

import mongoose, {Schema} from "mongoose";
import Messages from "../../models/messages/Messages";
const MessageSchema = new mongoose.Schema<Messages>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from : {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn:  {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;