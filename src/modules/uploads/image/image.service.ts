import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './image.model';
import { bufferToBase64 } from 'src/common/services/datauri';
import { cloudUpload } from 'src/common/services/cloudinary';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}

  // DESC: Service for image upload
  // target folder: /image.controller
  // target request: POST /api/v1/uploads
  uploadImage = async (file: Express.Multer.File) => {
    try {
      if (!file) {
        throw new NotFoundException('Image is not presented!');
      }

      // Create base 64 representation of the file
      const file64 = bufferToBase64(file);

      // Upload file to cloudinary
      const result = await cloudUpload(file64.content);

      // Push file to database
      const cImage = new this.imageModel({
        url: result.secure_url,
        cloudinaryId: result.public_id,
      });

      const savedImage = await cImage.save();
      return {
        _id: savedImage.id,
        url: savedImage.url,
      };
    } catch (error) {
      const errObj: {
        name: string;
        message: string;
      } = {
        name: error.name,
        message: error.message,
      };
      throw new BadRequestException(errObj);
    }
  };
}
