import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum Status {
  Pending = 'Pending',
  Done = 'Done',
  InProgress = 'In Progress',
  Paused = 'Paused',
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Pending,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.Low,
  })
  priority: Priority;

  @CreateDateColumn()
  dateOfCreation: Date;

  @Column({ default: true })
  isActive: boolean;
}
