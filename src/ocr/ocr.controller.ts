import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UploadedFile, UseInterceptors, HttpCode, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { CreateOcrDto } from './dto/create-ocr.dto';
import { UpdateOcrDto } from './dto/update-ocr.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ResponseData } from 'src/shared/response.data';

@Controller('api/ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  }))
  @HttpCode(HttpStatus.OK)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = new ResponseData()
    if (!file) {
      response.success = false
      response.error = 'File is not uploaded'
      throw new BadRequestException(response);
    }
    response.success = true;
    response.data = {
      filename: file.originalname,
      size: file.size,
    };
    // You can access file properties like file.originalname, file.buffer, etc.
    return response
  }

  @Post()
  create(@Body() createOcrDto: CreateOcrDto) {
    return this.ocrService.create(createOcrDto);
  }

  @Get()
  findAll() {
    return this.ocrService.findAll();
  }

  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  }))
  @Post('process-ocr')
  @HttpCode(HttpStatus.OK)
  async getOcr(@UploadedFile() file: Express.Multer.File){
    const response = new ResponseData()
    try {
      if (!file) {
        response.success = false
        response.error = 'File is not uploaded'
        throw new BadRequestException(response);
      }
      let data = await this.ocrService.ocrImage(file)
      response.success = true;
      response.data = data;
      return response
    } catch (error) {
      throw error
    }
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ocrService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOcrDto: UpdateOcrDto) {
    return this.ocrService.update(+id, updateOcrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ocrService.remove(+id);
  }

}
