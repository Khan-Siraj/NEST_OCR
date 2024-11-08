import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOcrDto } from './dto/create-ocr.dto';
import { UpdateOcrDto } from './dto/update-ocr.dto';
import { ocrSpace } from 'ocr-space-api-wrapper';
import * as fs from 'fs';
import * as path from 'path';
import { ResponseData } from 'src/shared/response.data';
@Injectable()
export class OcrService {
  private readonly directoryPath = path.join(__dirname, '../../');
  create(createOcrDto: CreateOcrDto) {
    return 'This action adds a new ocr';
  }

  findAll() {
    return `This action returns all ocr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ocr`;
  }

  update(id: number, updateOcrDto: UpdateOcrDto) {
    return `This action updates a #${id} ocr`;
  }

  remove(id: number) {
    return `This action removes a #${id} ocr`;
  }

  async ocrImage(file: Express.Multer.File){
    try {
      const filePath = path.join(this.directoryPath,'uploads', file.filename);
      let data = await ocrSpace(filePath,{apiKey:process.env.OCR_API_KEY})
      fs.unlinkSync(filePath);
      return data
    } catch (error) {
      const response = new ResponseData()
      response.success = false
      response.error = "Something went wrong while processing the image. Please try again later. Error: "+error.message
      throw new InternalServerErrorException(response)
    }
  }
}
