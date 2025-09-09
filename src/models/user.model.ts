import mongoose, { Schema, Document } from "mongoose";
import { UserRole, UserStatus } from "../utils/enum/user.enum";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  interests?: string[];
  education?: string;
  profession?: string;
  lifestyle?: string;
  lookingFor?: string;
  ageRange?: string;
  distance?: string;
  relationshipGoals?: string;
  media?: string[];
  profileVisibility?: string;
  onlineStatus?: string;
  resetCode: string | undefined;
  resetCodeExpiry: Date | undefined;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: UserRole,
      default: UserRole.USER,
    },
    status: {
      type: String,
      required: true,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },

    interests: [{ type: String }],
    education: { type: String },
    profession: { type: String },
    lifestyle: { type: String },
    lookingFor: { type: String, default: "Any" },
    ageRange: { type: String, default: "18-30" },
    distance: { type: String, default: "Any" },
    relationshipGoals: { type: String },
    media: [{ type: String }], // gallery
    profileVisibility: { type: String, default: "Everyone" },
    onlineStatus: { type: String, default: "Visible" },
    resetCode: { type: String },
    resetCodeExpiry: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IUser>("User", userSchema);
