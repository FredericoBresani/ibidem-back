import { Types } from 'mongoose';
import { Module } from 'src/shared/models/course-module.model';

export class CourseDto {
  title: string;
  subtitle: string;
  image: string;
  image_description: string;
  author_id: Types.ObjectId;
  trailer_link: string;
  course_url: string;
  price: number;
  objective: string;
  details: string[];
  includes: string[];
  for_whom: string[];
  do_it_if: string[];
  answered_questions: string[];
  what_is_needed: string[];
  about_instructor: string[];
  about_methodology: string[];
  modules: Module[];
  score?: number;
}
