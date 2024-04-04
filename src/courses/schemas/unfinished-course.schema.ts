import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UnfinishedCourseDocument = UnfinishedCourse & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class UnfinishedCourse {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: Types.ObjectId, required: true })
  public author_id: Types.ObjectId;

  @Prop({ type: Number, required: false })
  public access_count: number;

  @Prop({ type: [String], required: false })
  public emails: string[];
}
export const UnfinishedCourseSchema =
  SchemaFactory.createForClass(UnfinishedCourse);
