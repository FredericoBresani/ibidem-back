import { Types } from 'mongoose';
import { Module } from './course-module.model';

export interface CourseModel {
  title: string;
  subtitle: string;
  author_id: Types.ObjectId;
  image: string;
  image_description: string;
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
  _id?: Types.ObjectId;
}
