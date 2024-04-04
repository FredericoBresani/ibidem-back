import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as magic from '../shared/constants/constants';
import { UnfinishedCourse } from './schemas/unfinished-course.schema';
import { Model, Types } from 'mongoose';
import { UnfinishedCourseDto } from './dtos/unfinished-course.dto';
import { UnfinishedCoursesDto } from './dtos/unfinished-courses.dto';
import { CourseDto } from './dtos/course.dto';
import { CourseModel } from 'src/shared/models/course.model';
import { Course } from './schemas/course.schema';
import { CourseEvaluationDto } from './dtos/course-evaluation.dto';
import { CourseEvaluationModel } from 'src/shared/models/course-evaluation.model';
import { getCourseEvaluationPipeline } from './queries/course-pipelines';
import { UserService } from 'src/user/user.service';
import { UserModel } from 'src/shared/models/user.model';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(magic.UNFINISHED_COURSE_MODEL)
    private unfinishedCourseModel: Model<UnfinishedCourse>,
    @Inject(magic.COURSE_MODEL)
    private courseModel: Model<Course>,
    @Inject(magic.COURSE_EVALUATION)
    private courseEvaluationModel: Model<CourseEvaluationModel>,
    @Inject(magic.USER_MODEL)
    private readonly userModel: Model<UserModel>,
    private readonly userService: UserService,
  ) {}

  public async getCourseById(courseId: string): Promise<CourseModel> {
    const course = await this.courseModel.findOne({ _id: courseId });
    return course;
  }

  public async getCourses(): Promise<CourseModel[]> {
    const courses = await this.courseModel.find(
      {},
      { title: 1, _id: 1, image_description: 1, image: 1, subtitle: 1 },
    );
    return courses;
  }

  public async registerCourse(course: CourseDto): Promise<CourseModel> {
    const author_id = new Types.ObjectId(course.author_id);
    const author = await this.userModel.findOne({ _id: author_id });
    const courseExists = await this.courseModel.findOne(
      {
        $and: [{ author_id: author_id }, { title: course.title }],
      },
      { _id: 1 },
    );
    if (courseExists?._id) {
      throw new UnauthorizedException('COURSE_NAME_IN_USE');
    }
    if (!author.author) {
      this.clearPayload();
      throw new UnauthorizedException('USER_IS_NOT_AUTHOR');
    }
    if (this.userService.payload.sub !== author._id.toString()) {
      this.clearPayload();
      throw new UnauthorizedException('VALIDATION_EXIRED');
    }
    this.clearPayload();
    course.author_id = author_id;
    return this.courseModel.create(course);
  }

  public async addEmailToNotify(
    unfinishedCourse: UnfinishedCourseDto,
  ): Promise<{ email: string }> {
    const course = await this.unfinishedCourseModel.findOne({
      name: unfinishedCourse.name,
    });
    const index = course.emails
      ? course.emails.indexOf(unfinishedCourse.email)
      : -1;
    if (index !== -1) throw new BadRequestException('EMAIL_ALREADY_ADDED');
    await course.updateOne({ $push: { emails: unfinishedCourse.email } });
    return { email: unfinishedCourse.email };
  }

  public async incrementUnfinishedAccess(courseTitle: string): Promise<void> {
    const unfinished = await this.unfinishedCourseModel.findOne({
      name: courseTitle,
    });
    const unfinishedUpdated = Object.assign(unfinished, {
      access_count: (unfinished.access_count || 0) + 1,
    });
    void unfinishedUpdated.save();
  }

  public async addUnfinishedCourse(
    course: UnfinishedCoursesDto,
  ): Promise<void> {
    const author_id = new Types.ObjectId(course.author_id);
    const author = await this.userModel.findOne({ _id: author_id });
    const courseExistis = await this.unfinishedCourseModel.findOne(
      {
        $and: [{ author_id: author_id }, { name: course.name }],
      },
      { _id: 1 },
    );
    if (courseExistis?._id) {
      throw new UnauthorizedException('COURSE_NAME_IN_USE');
    }
    if (!author.author) {
      this.clearPayload();
      throw new UnauthorizedException('USER_IS_NOT_AUTHOR');
    }
    if (this.userService.payload.sub !== author._id.toString()) {
      this.clearPayload();
      throw new UnauthorizedException('VALIDATION_EXPIRED');
    }
    this.clearPayload();
    course.author_id = author_id;
    await this.unfinishedCourseModel.create(course);
  }

  public async registerCourseEvaluation(
    evaluation: CourseEvaluationDto,
  ): Promise<CourseModel> {
    const user = await this.userModel.findOne({
      username: evaluation.username,
    });
    const objectId = new Types.ObjectId(evaluation.course_id);
    evaluation.course_id = objectId;
    const evaluationExists = await this.courseEvaluationModel.findOne(
      {
        $and: [{ course_id: objectId }, { username: evaluation.username }],
      },
      { _id: 1 },
    );
    if (evaluationExists?._id) {
      throw new UnauthorizedException('COURSE_ALREADY_EVALUATED');
    }
    if (this.userService.payload.sub !== user._id.toString()) {
      this.clearPayload();
      throw new UnauthorizedException('VALIDATION_EXPIRED');
    }
    this.clearPayload();
    await this.courseEvaluationModel.create(evaluation);
    const course = await this.courseModel.findOne({
      _id: evaluation.course_id,
    });
    let courseScore = 0;
    if (course.score) {
      courseScore = (course.score + evaluation.stars) / 2;
    } else {
      courseScore = evaluation.stars;
    }
    const updatedCourse = Object.assign(course, {
      score: courseScore,
    });

    return updatedCourse.save();
  }

  public async getCourseEvaluations(
    courseId: string,
  ): Promise<CourseEvaluationModel[]> {
    const pipeline = getCourseEvaluationPipeline(courseId);
    const evaluations = await this.courseEvaluationModel
      .aggregate(pipeline)
      .sort({ _id: -1 })
      .limit(3);
    return evaluations;
  }

  public clearPayload(): void {
    this.userService.payload = {};
  }
}
