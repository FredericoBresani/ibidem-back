import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
  Request,
  Query,
  Headers,
  Delete,
} from '@nestjs/common';
import { UserLoginModel } from 'src/shared/models/user-login.model';
import { UserModel } from 'src/shared/models/user.model';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiAccessGuard } from 'src/auth/guards/api-access.guard';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { PasswordRecover } from 'src/shared/models/user-recover-password.model';

@UseGuards(ApiAccessGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailSenderService: MailSenderService,
  ) {}

  @Get()
  public getAllUsers(): Promise<void> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JWTAuthGuard)
  @Get('by-id')
  public getUserById(@Query() userId: { id: string }): Promise<UserModel> {
    return this.userService.getUserById(userId.id);
  }

  @Get(':email')
  public getUserByEmail(@Param('email') userEmail: string): Promise<UserModel> {
    return this.userService.getUserByEmail(userEmail);
  }

  @Get(':name')
  public getUserByName(@Param('name') userName: string): Promise<UserModel> {
    return this.userService.getUserByName(userName);
  }

  @UseGuards(JWTAuthGuard)
  @Get('verify/token/id')
  public verifyTokenRecover(@Query() params: any): Promise<UserModel> {
    return this.userService.verifyTokenRecover(params.userId);
  }

  @Put('update-account/:id')
  public async updateUserById(
    @Param('id') userId: string,
    @Body() userDto: UserDto,
  ): Promise<UserModel> {
    const userUpdated = await this.userService.updateUserById(userId, userDto);
    const token = await this.authService.generateConfirmToken(
      userUpdated.username,
      userUpdated._id.toString(),
    );
    this.mailSenderService.sendUpdateVerifyEmail(
      token.access_token,
      userUpdated.temp_email,
      userId,
    );
    return userUpdated;
  }

  @UseGuards(JWTAuthGuard)
  @Put('confirm-registry')
  public async confirmRegistry(@Query() params: any): Promise<UserModel> {
    return this.userService.confirmRegistry(params);
  }

  @UseGuards(JWTAuthGuard)
  @Put('confirm-update')
  public async confirmAccountUpdate(@Query() params: any): Promise<UserModel> {
    return this.userService.confirmAccountUpdate(params);
  }

  @Put('resend-register-verification')
  public async resendRegisterVerification(
    @Body() userId: { id: string },
  ): Promise<void> {
    const user = await this.userService.resendRegisterVerification(userId.id);
    const token = await this.authService.generateConfirmToken(
      user.username,
      user._id.toString(),
    );
    await this.mailSenderService.sendRegistryVerifyEmail(
      token.access_token,
      user.email,
      user._id.toString(),
    );
  }

  @Put('send-recover-email')
  public async sendRecoverEmail(
    @Body() email: { email: string },
  ): Promise<UserModel> {
    const user = await this.userService.sendRecoverEmail(email.email);
    const token = await this.authService.generateConfirmToken(
      user.username,
      user._id.toString(),
    );
    this.mailSenderService.sendRecoverPasswordLink(
      token.access_token,
      user.email,
      user._id.toString(),
    );
    return user;
  }

  @UseGuards(JWTAuthGuard)
  @Put('recover-password')
  public async recoverAccountPassword(
    @Body() recover: PasswordRecover,
    @Query() params: { id: string },
  ): Promise<void> {
    await this.userService.recoverAccountPassword(recover, params.id);
  }

  @Post()
  public async registerUser(@Body() userDto: UserDto): Promise<UserModel> {
    const user = await this.userService.registerUser(userDto);
    const token = await this.authService.generateConfirmToken(
      user.username,
      user._id.toString(),
    );
    await this.mailSenderService.sendRegistryVerifyEmail(
      token.access_token,
      user.email,
      user._id.toString(),
    );
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async loginUser(
    @Body() login: UserLoginModel,
  ): Promise<{ user: UserModel; access_token: string }> {
    const user = await this.userService.loginUser(login);
    const token = await this.authService.login(
      user.username,
      user._id.toString(),
    );
    return { user, access_token: token.access_token };
  }

  @Delete()
  public async deleteAccount(
    @Query() userId: { userId: string },
  ): Promise<void> {
    return this.userService.deleteAccount(userId.userId);
  }
}
