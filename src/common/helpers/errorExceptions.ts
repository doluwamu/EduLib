import { BadRequestException } from '@nestjs/common';

export const getErrorMsg = (error) => {
  const errObj: {
    name: string;
    message: string;
  } = {
    name: error.name,
    message: error.message,
  };
  throw new BadRequestException(errObj);
};
