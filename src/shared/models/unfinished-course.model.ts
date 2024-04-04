import { Types } from 'mongoose';

export interface UnfinishedCourseModel {
  name: string;

  author_id: Types.ObjectId;

  emails: string[];

  _id?: Types.ObjectId;
}
