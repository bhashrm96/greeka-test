import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  NotFoundException,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    try {
      const task = await this.todoService.create(createTodoDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Task created successfully',
        data: task,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get list of tasks with pagination and filters' })
  @ApiResponse({ status: 200, description: 'List of tasks retrieved successfully.' })
  async findAll(@Query() query: GetTodoDto) {
    let active: boolean | undefined = undefined;
    if (query.isActive === 'true') active = true;
    else if (query.isActive === 'false') active = false;

    return this.todoService.findAll(
      query.page,
      query.limit,
      query.status,
      query.priority,
      active,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const task = await this.todoService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ) {
    try {
      const updatedTask = await this.todoService.update(id, updateTodoDto);
      if (!updatedTask) {
        throw new NotFoundException('Task not found');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Task updated successfully',
        data: updatedTask,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const deleted = await this.todoService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Task not found');
    }
    return res.json({
      message: 'Task deleted successfully',
    });
  }
}
