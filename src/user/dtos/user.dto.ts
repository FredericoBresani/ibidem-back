import { confirmationType } from 'src/shared/models/user.model';

export class UserDto {
  public username?: string;

  public email?: string;

  public password?: string;

  public user_image?: string;

  public author?: boolean;

  public temp_password?: string;

  public temp_email?: string;

  public temp_username?: string;

  public register_date?: Date;

  public birth_date?: Date;

  public temp_birth_date?: Date;

  public confirmation?: confirmationType;

  public receive_emails?: boolean;

  public temp_receive_emails?: boolean;

  public avocados?: number;
}
