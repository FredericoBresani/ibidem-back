import { Types } from 'mongoose';

export interface CourseEvaluationModel {
  username: Types.ObjectId;
  course_id: Types.ObjectId;
  stars: number;
  comment: string;
  user_image?: string;
  created_at?: Date;
  _id?: Types.ObjectId;
}
