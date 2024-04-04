import * as mongoose from 'mongoose';
import * as magic from '../shared/constants/constants';
import { ArticleSchema } from 'src/articles/schemas/article.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UnfinishedCourseSchema } from 'src/courses/schemas/unfinished-course.schema';
import { CourseSchema } from 'src/courses/schemas/course.schema';
import { CourseEvaluationSchema } from 'src/courses/schemas/course-evaluation.schema';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DATABASE_URL),
  },
  {
    provide: magic.ARTICLE_MODEL,
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Article', ArticleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: magic.USER_MODEL,
    useFactory: (connection: mongoose.Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: magic.COURSE_MODEL,
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Course', CourseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: magic.UNFINISHED_COURSE_MODEL,
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Unfinished_course', UnfinishedCourseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: magic.COURSE_EVALUATION,
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Course_evaluation', CourseEvaluationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
