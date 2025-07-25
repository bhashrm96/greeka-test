import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { Status, Priority } from '../entities/todo.entity';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: '2025-08-01T10:00:00.000Z' })
  @IsDateString({}, { message: 'Due Date must be a valid ISO date string' })
  dueDate: string;

  @ApiPropertyOptional({ enum: Status, example: 'Pending' })
  @IsEnum(Status, { message: 'Status must be one of Pending, Done, In Progress, Paused' })
  @IsOptional()
  status?: Status;

  @ApiPropertyOptional({ enum: Priority, example: 'High' })
  @IsEnum(Priority, { message: 'Priority must be one of High, Medium, Low' })
  @IsOptional()
  priority?: Priority;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
