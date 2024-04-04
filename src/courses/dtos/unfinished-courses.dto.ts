import { Types } from 'mongoose';

export class UnfinishedCoursesDto {
  name: string;
  author_id: Types.ObjectId;
  emails: string[];
}
