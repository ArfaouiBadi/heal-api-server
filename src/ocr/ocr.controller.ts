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
    console.log(file);
    return this.ocrService.parseImage(file.buffer);
  }
}
