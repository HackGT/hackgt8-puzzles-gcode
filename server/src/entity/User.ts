import { mongoose, RootDocument } from './database'

export interface ISubmission extends RootDocument {
    correct: boolean,
    date: Date, 
    value: string 
}

export type ISubmissionMongoose = ISubmission & mongoose.Document;


const SubmissionSchema = new mongoose.Schema({
    correct: Boolean,
    date: Date,
    value: String
})

export interface IUser extends RootDocument {
    uuid: string;
    email: string;
    name: string;
    token: string;
    submissions: ISubmission[];
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
    },
    submissions: {
        type: [SubmissionSchema],
        default: []
    }
},{
    usePushEach: true
})

export const User = mongoose.model<IUserMongoose>("User", UserSchema);
