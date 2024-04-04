import { Types } from 'mongoose';

export class CourseEvaluationDto {
  username: Types.ObjectId;
  course_id: Types.ObjectId;
  stars: number;
  comment: string;
}
