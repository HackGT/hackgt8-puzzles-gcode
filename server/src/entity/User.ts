import { mongoose, RootDocument } from './database'

export interface IUser extends RootDocument {
    uuid: string;
    email: string;
    name: string;
    token: string;
}

export type IUserMongoose = IUser & mongoose.Document;

const UserSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    token: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},{
    usePushEach: true
})

export const User = mongoose.model<IUserMongoose>("User", UserSchema);
