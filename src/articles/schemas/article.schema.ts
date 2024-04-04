import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Article {
  @Prop({ type: String, required: true })
  public url: string;

  @Prop({ type: String, required: true })
  public author: string;

  @Prop({ type: String, required: true })
  public image: string;

  @Prop({ type: String, required: true })
  public description: string;

  @Prop({ type: String, required: false })
  public image_description: string;

  @Prop({ type: String, required: true })
  public title: string;

  @Prop({ type: String, required: true })
  public subtitle: string;

  @Prop({ type: String, required: true })
  public category: string;

  @Prop({ type: Number, required: false })
  public access_count: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
