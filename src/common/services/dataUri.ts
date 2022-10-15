import DatauriParser from 'datauri/parser.js';
import path from 'path';

const dUri = new DatauriParser();

export const bufferToBase64 = (file) =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);
