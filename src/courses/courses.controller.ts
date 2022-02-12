import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import Review from './review.entity';
import Course from './course.entity';

import { CoursesService } from './courses.service';

import { CreateCourseDto } from './dto/create-course.dto';
import { CreateReviewDto } from './dto/create-review-dto';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) { }

    @Get()
    async findAll(): Promise<Course[]> {
        return this.coursesService.findAll();
    }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        if ((createCourseDto.number !== undefined) && (createCourseDto.title !== undefined)) {
            const newCourse = this.coursesService.create(createCourseDto);
            return newCourse;
        } else {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':courseId/reviews')
    async findAllReviews(@Param('courseId') courseId: string): Promise<Review[]> {
        return this.coursesService.findAllReviews(courseId);
    }

    @Post(':courseId/reviews')
    async createReview(@Param('courseId') courseId: string,
        @Body() createReviewDto: CreateReviewDto) {
        if ((createReviewDto.score !== undefined) && (createReviewDto.comments !== undefined)) {
            createReviewDto.courseId = new ObjectID(courseId);
            const newReview = this.coursesService.createReview(createReviewDto);
            return newReview;
        } else {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }
}