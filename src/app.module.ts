import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:ODvFDpKvTQTWi5cA@db.bsclnoqpauirnbfguwzm.supabase.co:5432/postgres',
      ssl: {
        rejectUnauthorized: false
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TodoModule,
  ],
})
export class AppModule {}
