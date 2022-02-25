/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks schema
 */

import mongoose, {Schema} from "mongoose";
import Bookmarks from "../../models/bookmarks/Bookmarks";
const BookmarkSchema = new mongoose.Schema<Bookmarks>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;