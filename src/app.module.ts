import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Course from './courses/course.entity';
import { CoursesModule } from './courses/course.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import Review from './courses/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://pant:CRHwMB9eiQ2Z@cluster0.jjsfz.mongodb.net/test',
      database: 'test',
      entities: [Course, Review],
      synchronize: true,
    }),
    CoursesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
