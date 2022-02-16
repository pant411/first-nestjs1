import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Course from "./course.entity";
import Review from './review.entity';

import { CreateCourseDto } from './dto/create-course.dto';
import { CreateReviewDto } from './dto/create-review-dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>
    ) { }

    async findAll(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    async create(createCourseDto: CreateCourseDto) {
        return this.courseRepository.save(createCourseDto);
    }

    async findAllReviews(courseId: string): Promise<Review[]> {
        return this.reviewRepository.find({ where: { courseId: courseId } });
    }

    async createReview(createReviewDto: CreateReviewDto) {
        return this.reviewRepository.save(createReviewDto);
    }

}