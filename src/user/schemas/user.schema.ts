import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { confirmationType } from 'src/shared/models/user.model';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class User {
  @Prop({ type: String, required: true })
  public username: string;

  @Prop({ type: String, required: false })
  public temp_username: string;

  @Prop({ type: String, required: true })
  public email: string;

  @Prop({ type: String, required: false })
  public temp_email: string;

  @Prop({ type: String, required: true })
  public password: string;

  @Prop({ type: String, required: false })
  public temp_password: string;

  @Prop({ type: Boolean, required: true })
  public author: boolean;

  @Prop({ type: String, required: false })
  public user_image: string;

  @Prop({ type: Date, required: true })
  public register_date: Date;

  @Prop({ type: Date, required: false })
  public birth_date: Date;

  @Prop({ type: Date, required: false })
  public temp_birth_date: Date;

  @Prop({ type: Number, required: true })
  public avocados: number;

  @Prop({ type: String, required: false, default: 'none' })
  public confirmation: confirmationType;

  @Prop({ type: Boolean, required: false })
  public receive_emails: boolean;

  @Prop({ type: Boolean, required: false })
  public temp_receive_emails: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
