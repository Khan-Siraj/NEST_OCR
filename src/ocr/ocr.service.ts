import { Injectable } from '@nestjs/common';
import { CreateOcrDto } from './dto/create-ocr.dto';
import { UpdateOcrDto } from './dto/update-ocr.dto';
import { ocrSpace } from 'ocr-space-api-wrapper';
@Injectable()
export class OcrService {
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

  async ocrImage(){
    try {
      let res = await ocrSpace('https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/65dded0b8fbe099981aa953e_Software-Design-Documentation.png',{apiKey:process.env.OCR_API_KEY})
      return res
    } catch (error) {
      return error
    }
  }
}
