import { Types } from 'mongoose';

export class UnfinishedCourseDto {
  public name: string;
  public author_id: Types.ObjectId;
  public email: string;
  public access_count?: number;
}
