import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Module } from 'src/shared/models/course-module.model';

export type CourseDocument = Course & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Course {
  @Prop({ type: String, required: true })
  public title: string;

  @Prop({ type: String, required: true })
  public subtitle: string;

  @Prop({ type: String, required: true })
  public image: string;

  @Prop({ type: String, required: true })
  public image_description: string;

  @Prop({ type: Types.ObjectId, required: true })
  public author_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  public trailer_link: string;

  @Prop({ type: String, required: true })
  public course_url: string;

  @Prop({ type: Number, required: true })
  public price: number;

  @Prop({ type: String, required: true })
  public objective: string;

  @Prop({ type: [String], required: true })
  public details: string[];

  @Prop({ type: [String], required: true })
  public includes: string[];

  @Prop({ type: [String], required: true })
  public for_whom: string[];

  @Prop({ type: [String], required: true })
  public do_it_if: string[];

  @Prop({ type: [String], required: true })
  public answered_questions: string[];

  @Prop({ type: [String], required: true })
  public what_is_needed: string[];

  @Prop({ type: [String], required: true })
  public about_instructor: string[];

  @Prop({ type: [String], required: true })
  public about_methodology: string[];

  @Prop({
    type: [
      {
        number: { type: Number, required: true },
        name: { type: String, required: true },
        objective: { type: String, require: true },
        classes: { type: [String], required: false },
        duration: { type: Number, required: true },
      },
    ],
    required: true,
  })
  public modules: Module[];

  @Prop({ type: Number, required: false })
  public score?: number;
}
export const CourseSchema = SchemaFactory.createForClass(Course);
