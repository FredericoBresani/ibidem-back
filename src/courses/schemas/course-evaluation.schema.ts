import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseEvaluationDocument = CourseEvaluation & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class CourseEvaluation {
  @Prop({ type: String, required: true })
  public username: string;

  @Prop({ type: Types.ObjectId, required: true })
  public course_id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  public stars: number;

  @Prop({ type: String, required: true })
  public comment: string;
}
export const CourseEvaluationSchema =
  SchemaFactory.createForClass(CourseEvaluation);
