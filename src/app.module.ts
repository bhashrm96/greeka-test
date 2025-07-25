import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_dHUMRl8wGfY5@ep-lingering-haze-aexhx23b-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TodoModule,
  ],
})
export class AppModule {}
