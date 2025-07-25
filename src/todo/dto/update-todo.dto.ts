import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';
import { Status, Priority } from '../entities/todo.entity';

export class UpdateTodoDto {
  @ApiPropertyOptional({ example: 'In Progress' })
  @IsEnum(Status, { message: 'Status must be one of Pending, Done, In Progress, Paused' })
  @IsOptional()
  status?: Status;

  @ApiPropertyOptional({ example: 'Medium' })
  @IsEnum(Priority, { message: 'Priority must be one of High, Medium, Low' })
  @IsOptional()
  priority?: Priority;

  @ApiPropertyOptional({ example: 'Update task name if needed' })
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty if provided' })
  name?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean({ message: 'isActive must be a boolean' })
  @IsOptional()
  isActive?: boolean;
}
