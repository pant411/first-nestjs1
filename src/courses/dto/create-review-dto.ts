import { ObjectID } from "mongodb";

export class CreateReviewDto {
    comments: string;
    score: number;
    courseId?: ObjectID;
}