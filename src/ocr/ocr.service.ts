import { Injectable } from '@nestjs/common';
import * as tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  config = {
    lang: 'eng',
    oem: 1,
    psm: 4,
  };

  async parseImage(imageBuffer: any) {
    try {
      const text = await tesseract.recognize(imageBuffer, 'eng', {
        logger: (m) => console.log(m),
      });

      return text.data.text;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
