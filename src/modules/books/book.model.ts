import * as mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema(
  {
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    name: { type: String, required: true },
    author: { type: String },
    intendedReaders: { type: String, required: true, default: 'general' },
  },
  {
    timestamps: true,
  },
);

export interface Book extends Document {
  image?: mongoose.Types.ObjectId;
  name: string;
  author?: string | null;
  intendedReaders: string;
}

export type BookDetails = {
  image?: mongoose.Types.ObjectId;
  name: string;
  author?: string;
  intendedReaders: string;
};
