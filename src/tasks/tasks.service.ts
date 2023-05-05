import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  // constructor( pro)
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status=:status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) throw new NotFoundException(`Task with ID ${id} not found`);
    return found;
  }
  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.tasksRepository.save(task);
    return task;
  }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    // console.log(result);
  }
  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
  // async getTaskById(id: string): Promise<Task> {
  //   const found = await this.tasksRepository.findOne(id);
  //   if (!found) throw new NotFoundException(`Task with ID ${id} not found`);
  //   return found;
  // }
  // async getTaskById(id: string, user: User): Promise<Task> {
  //   const found = await this.tasksRepository.findOne({ where: { id, user } });
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return found;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return found;
  // }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   // const { status } = updateTaskStatusDto;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // updateTask(
  //   id: string,
  //   CreateTaskDto: CreateTaskDto,
  //   status: TaskStatus,
  // ): Task {
  //   const { title, description } = CreateTaskDto;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   task.title = title;
  //   task.description = description;
  //   return task;
  // }
}
