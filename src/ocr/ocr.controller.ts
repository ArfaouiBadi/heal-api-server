/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File is required');
    }
    console.log(file.mimetype);
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg'
    ) {
      throw new Error('Invalid file type');
    }
    return this.ocrService.parseImage(file.buffer);
  }
}
