/* 
    user.dbmodel.ts

    creates the user mongoose schema
 */
import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});
