import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export interface Image extends mongoose.Document {
  url: string;
  cloudinaryId: string;
}
