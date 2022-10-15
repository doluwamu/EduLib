import cloudinary from 'cloudinary';

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
console.log(CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET);

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  cloud_name: 'book-with-me-react',
  api_key: '159891148827824',
  api_secret: 'SeRfIEz77gihdhInpcz1UNRdN94',
});

export const cloudUpload = (file) => cloudinaryV2.uploader.upload(file);
