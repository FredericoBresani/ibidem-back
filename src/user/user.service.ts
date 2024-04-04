import {
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserModel } from 'src/shared/models/user.model';
import * as magic from '../shared/constants/constants';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
import { UserLoginModel } from 'src/shared/models/user-login.model';
import { PasswordRecover } from 'src/shared/models/user-recover-password.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  public payload: any = {};

  constructor(@Inject(magic.USER_MODEL) private userModel: Model<User>) {}

  public async getAllUsers(): Promise<void> {
    const users = await this.userModel.find();
    // return users;
  }

  public async getUserById(userId: string): Promise<UserModel> {
    const user = await this.userModel.findOne(
      { _id: userId },
      {
        username: 1,
        email: 1,
        register_date: 1,
        birth_date: 1,
        receive_emails: 1,
        _id: 1,
      },
    );
    if (!user?._id) throw new BadRequestException('USER_NOT_FOUND');
    if (this.payload && this.payload.sub === userId) {
      this.clearPayload();
      return user;
    }
    this.clearPayload();
    throw new BadRequestException('VALIDATION_EXPIRED');
  }

  public async getUserByEmail(userEmail: string): Promise<UserModel> {
    const user = this.userModel.findOne(
      { email: userEmail },
      { username: 1, email: 1, _id: 1 },
    );
    return user;
  }

  public async getUserByName(userName: string): Promise<UserModel> {
    const user = await this.userModel.findOne(
      { username: userName },
      { username: 1, email: 1, _id: 1, password: 1 },
    );
    return user;
  }

  public async loginUser(login: UserLoginModel): Promise<UserModel> {
    const user = await this.userModel.findOne(
      { username: login.username },
      { username: 1, email: 1, _id: 1 },
    );
    return user;
  }

  public async updateUserById(
    userId: string,
    userDto: UserDto,
  ): Promise<UserModel> {
    const user = await this.userModel.findById(userId);
    if (user.confirmation)
      throw new UnauthorizedException('VERIFY_ACCOUNT_FIRST');

    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('WRONG_PASSWORD');

    if (user.email !== userDto.temp_email) {
      const emailExists = await this.userModel.findOne(
        {
          $or: [
            { email: userDto.temp_email },
            { temp_email: userDto.temp_email },
          ],
        },
        { _id: 1 },
      );
      if (emailExists?._id)
        throw new UnauthorizedException('NEW_EMAIL_ALREADY_IN_USE');
    }

    if (user.username !== userDto.temp_username) {
      const nameExists = await this.userModel.findOne(
        {
          $or: [
            { username: userDto.temp_username },
            { temp_username: userDto.temp_username },
          ],
        },
        { _id: 1 },
      );
      if (nameExists?._id)
        throw new UnauthorizedException('NEW_USERNAME_IN_USE');
    }
    const updatedUser = Object.assign(user, userDto);
    if (userDto.temp_password) {
      updatedUser.temp_password = await bcrypt.hash(
        userDto.temp_password,
        await bcrypt.genSalt(),
      );
    }
    updatedUser.password = await bcrypt.hash(
      userDto.password,
      await bcrypt.genSalt(),
    );
    updatedUser.confirmation = 'update';
    await updatedUser.save();
    const updated = await this.userModel.findOne(
      { _id: updatedUser._id },
      { username: 1, email: 1, temp_email: 1, _id: 1 },
    );
    return updated;
  }

  public async registerUser(userDto: UserDto): Promise<UserModel> {
    const userToRegister: UserDto = Object.assign(userDto, {
      username: userDto.temp_username,
      email: userDto.temp_email,
      password: await bcrypt.hash(userDto.password, await bcrypt.genSalt()),
      birth_date: userDto.temp_birth_date,
      receive_emails: userDto.temp_receive_emails,
      temp_username: '',
      temp_email: '',
      confirmation: 'register',
    });
    const userNameExists = await this.userModel.findOne(
      {
        $or: [
          { username: userToRegister.username },
          { temp_username: userToRegister.username },
        ],
      },
      { _id: 1 },
    );
    if (userNameExists) throw new BadRequestException('USERNAME_IN_USE');
    const userEmailExists = await this.userModel.findOne(
      {
        $or: [
          { email: userToRegister.email },
          { temp_email: userToRegister.email },
        ],
      },
      { _id: 1 },
    );
    if (userEmailExists) throw new BadRequestException('EMAIL_IN_USE');
    const user = new this.userModel(userToRegister);
    const savedUser = await user.save();
    const saved = await this.userModel.findOne(
      { _id: savedUser._id },
      { username: 1, email: 1, _id: 1 },
    );
    return saved;
  }

  public async verifyTokenRecover(userId: string): Promise<UserModel> {
    const user = await this.userModel.findOne(
      { _id: userId },
      { _id: 1, username: 1, confirmation: 1 },
    );
    if (!this.payload.sub) {
      this.clearPayload();
      if (user?._id) {
        const updatedUser = Object.assign(user, { confirmation: null });
        await updatedUser.save();
      }
      throw new UnauthorizedException('VALIDATION_EXPIRED');
    }
    if (this.payload.sub !== user._id.toString()) {
      this.clearPayload();
      const updatedUser = Object.assign(user, { confirmation: null });
      await updatedUser.save();
      throw new UnauthorizedException('VALIDATION_EXPIRED');
    }
    this.clearPayload();
    return user;
  }

  public async confirmRegistry(query: any): Promise<UserModel> {
    const payloadId = this.payload.sub;
    const user = await this.userModel.findOne(
      { _id: query.id },
      { _id: 1, confirmation: 1, username: 1, email: 1 },
    );
    if (!user?._id) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (user.confirmation !== 'register') {
      throw new UnauthorizedException('VERIFY_ACCOUNT_FIRST');
    }
    const stringId = user._id.toString();
    if (stringId == payloadId) {
      const updatedUser = Object.assign(user, { confirmation: null });
      await updatedUser.save();
      this.clearPayload();
      return updatedUser;
    } else {
      this.clearPayload();
      throw new UnauthorizedException('VALIDATION_EXPIRED');
    }
  }

  public async confirmAccountUpdate(query: any): Promise<UserModel> {
    const user = await this.userModel.findOne({ _id: query.id });
    if (!user?._id) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (user.confirmation !== 'update' && user.confirmation !== null) {
      throw new UnauthorizedException('VERIFY_ACCOUNT_FIRST');
    }
    if (user._id.toString() == this.payload.sub) {
      const newPass = user.temp_password ? user.temp_password : user.password;
      const updatedUser = Object.assign(user, {
        email: user.temp_email,
        username: user.temp_username,
        password: newPass,
        receive_emails: user.temp_receive_emails,
        birth_date: user.temp_birth_date,
        temp_password: '',
        temp_email: '',
        temp_username: '',
        temp_birth_date: '',
        temp_receive_emails: null,
        confirmation: null,
      });
      await updatedUser.save();
      const updated = await this.userModel.findOne(
        { _id: updatedUser._id },
        { username: 1, email: 1, temp_email: 1, _id: 1 },
      );
      this.clearPayload();
      return updated;
    } else {
      this.clearPayload();
      const updatedUser = Object.assign(user, {
        temp_password: '',
        temp_email: '',
        temp_username: '',
        confirmation: null,
      });
      await updatedUser.save();
      throw new UnauthorizedException('VALIDATION_EXPIRED');
    }
  }

  public async sendRecoverEmail(email: string): Promise<UserModel> {
    const user = await this.userModel.findOne(
      { email: email },
      { _id: 1, email: 1, username: 1, confirmation: 1 },
    );
    if (user && user._id) {
      if (user.confirmation) {
        throw new UnauthorizedException('VERIFY_ACCOUNT_FIRST');
      } else {
        const updatedUser = Object.assign(user, { confirmation: 'recover' });
        await updatedUser.save();
        return user;
      }
    }
    throw new UnauthorizedException('USER_NOT_FOUND');
  }

  public clearPayload(): void {
    this.payload = {};
  }

  public async deleteAccount(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId);
  }

  public async recoverAccountPassword(
    recover: PasswordRecover,
    userId: string,
  ): Promise<UserModel> {
    const user = await this.userModel.findOne({ _id: userId });
    if (
      this.payload.sub === userId &&
      this.payload.username === user.username
    ) {
      if (user.confirmation !== 'recover') {
        throw new UnauthorizedException('VERIFY_ACCOUNT_FIRST');
      } else {
        if (user?._id) {
          const updatedUser = Object.assign(user, {
            password: await bcrypt.hash(
              recover.password,
              await bcrypt.genSalt(),
            ),
            confirmation: null,
          });
          await updatedUser.save();
          this.clearPayload();
          const updated = await this.userModel.findOne(
            { _id: updatedUser._id },
            { username: 1, email: 1, _id: 1 },
          );
          return updated;
        }
        throw new UnauthorizedException('USER_NOT_FOUND');
      }
    } else {
      const resetUser = Object.assign(user, { confirmation: null });
      await resetUser.save();
      throw new UnauthorizedException('VALIDATION_EXPIRED');
    }
  }

  public async resendRegisterVerification(userId: string): Promise<UserModel> {
    const user = await this.userModel.findOne(
      { _id: userId },
      { username: 1, email: 1, _id: 1 },
    );
    if (user && user._id) {
      return user;
    } else {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
  }
}
