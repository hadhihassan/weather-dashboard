import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: ObjectId,
    username: string;
    email: string;
    password: string;
    favoriteCities: string[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteCities: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);