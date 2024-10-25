// src/uploads/dto/create-upload.dto.ts
import { IsNotEmpty } from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  filename: string;
}
