import {
  Controller,
  Get,
  UseGuards,
  Query,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { ApiAccessGuard } from 'src/auth/guards/api-access.guard';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIsAuthorGuard } from 'src/auth/guards/user-is-author.guard';
import { CourseEvaluationModel } from 'src/shared/models/course-evaluation.model';
import { CourseModel } from 'src/shared/models/course.model';
import { CoursesService } from './courses.service';
import { CourseEvaluationDto } from './dtos/course-evaluation.dto';
import { CourseDto } from './dtos/course.dto';
import { UnfinishedCourseDto } from './dtos/unfinished-course.dto';
import { UnfinishedCoursesDto } from './dtos/unfinished-courses.dto';

@UseGuards(ApiAccessGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  public getCourses(): Promise<CourseModel[]> {
    return this.coursesService.getCourses();
  }

  @Get('course-evaluations')
  public getCourseEvaluations(
    @Query() query: { courseId: string },
  ): Promise<CourseEvaluationModel[]> {
    return this.coursesService.getCourseEvaluations(query.courseId);
  }

  @Get('by-id')
  public getCourseById(
    @Query() query: { courseId: string },
  ): Promise<CourseModel> {
    return this.coursesService.getCourseById(query.courseId);
  }

  @UseGuards(JWTAuthGuard)
  @Post('register')
  public registerCourse(@Body() course: CourseDto): Promise<CourseModel> {
    return this.coursesService.registerCourse(course);
  }

  @UseGuards(JWTAuthGuard)
  @Post('evaluate')
  public registerCourseEvaluation(
    @Body() evaluation: CourseEvaluationDto,
  ): Promise<CourseModel> {
    return this.coursesService.registerCourseEvaluation(evaluation);
  }

  @UseGuards(JWTAuthGuard)
  @Post('unfinished')
  public addUnfinishedCourses(
    @Body() courses: UnfinishedCoursesDto,
  ): Promise<void> {
    return this.coursesService.addUnfinishedCourse(courses);
  }

  @Put('add-email')
  public addEmailToNotify(
    @Body() course: UnfinishedCourseDto,
  ): Promise<{ email: string }> {
    return this.coursesService.addEmailToNotify(course);
  }

  @Put('iuaccess')
  public incrementUnfinishedAccess(
    @Body() courseTitle: { title: string },
  ): Promise<void> {
    return this.coursesService.incrementUnfinishedAccess(courseTitle.title);
  }
}
