import { IsOptional, IsEnum, IsBooleanString, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status, Priority } from '../entities/todo.entity';

export class GetTodoDto {
  @ApiPropertyOptional({ enum: Status, description: 'Filter by status' })
  @IsOptional()
  @IsEnum(Status, { message: 'Status must be one of Pending, In Progress, Paused, Done' })
  status?: Status;

  @ApiPropertyOptional({ enum: Priority, description: 'Filter by priority' })
  @IsOptional()
  @IsEnum(Priority, { message: 'Priority must be one of High, Medium, Low' })
  priority?: Priority;

  @ApiPropertyOptional({ type: Boolean, description: 'Filter by active status (true/false)' })
  @IsOptional()
  @IsBooleanString({ message: 'isActive must be a boolean string (true or false)' })
  isActive?: string;

  @ApiPropertyOptional({ default: 1, description: 'Page number for pagination' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumberString({}, { message: 'Page must be a number' })
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({ default: 5, description: 'Number of items per page' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumberString({}, { message: 'Limit must be a number' })
  @IsOptional()
  limit: number = 5;
}
