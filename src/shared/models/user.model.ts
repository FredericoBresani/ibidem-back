import { Types } from 'mongoose';

export type confirmationType = 'register' | 'update' | 'recover' | null;

export interface UserModel {
  username: string;

  email: string;

  password?: string;

  author: boolean;

  register_date: Date;

  birth_date?: Date;

  temp_birth_date?: Date;

  avocados: number;

  confirmation?: confirmationType;

  temp_email?: string;

  temp_password?: string;

  temp_username?: string;

  receive_emails?: boolean;

  temp_receive_emails?: boolean;

  access_token?: string;

  _id?: Types.ObjectId;
}
