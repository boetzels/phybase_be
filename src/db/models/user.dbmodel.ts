/* 
    user.dbmodel.ts

    creates the user mongoose model
 */
import mongoose from 'mongoose';
import { UserSchema } from '../schema/user.dbschema';

export const UserModel = mongoose.model("User", UserSchema);
