import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo, Status, Priority } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private taskRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const task = this.taskRepository.create(createTodoDto);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new BadRequestException('Failed to create task');
    }
  }

  async findAll(
    page: number,
    limit: number,
    status?: Status,
    priority?: Priority,
    isActive?: boolean,
  ) {
    const skip = (page - 1) * limit;

    const query = this.taskRepository.createQueryBuilder('todo');

    if (status) query.andWhere('todo.status = :status', { status });
    if (priority) query.andWhere('todo.priority = :priority', { priority });
    if (typeof isActive === 'boolean') query.andWhere('todo.isActive = :isActive', { isActive });

    const [tasks, total] = await query
      .orderBy('todo.dueDate', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      totalItems: total,
      totalPages,
      tasks,
    };
  }


  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const task = await this.findOne(id);
    try {
      await this.taskRepository.update(id, updateTodoDto);
      return this.taskRepository.merge(task, updateTodoDto);
    } catch (error) {
      throw new BadRequestException('Failed to update task');
    }
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    try {
      return await this.taskRepository.remove(task);
    } catch (error) {
      throw new BadRequestException('Failed to delete task');
    }
  }
}
