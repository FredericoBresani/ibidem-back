import { Types } from 'mongoose';

export const getCourseEvaluationPipeline = (courseId: string) => {
  const pipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'username',
        foreignField: 'username',
        pipeline: [
          {
            $match: {
              $expr: { course_id: new Types.ObjectId(courseId) },
            },
          },
          { $project: { _id: 0, user_image: 1 } },
        ],
        as: 'user_images',
      },
    },
    {
      $addFields: {
        image_from_user: { $arrayElemAt: ['$user_images', 0] },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ['$image_from_user', '$$ROOT'],
        },
      },
    },
    {
      $project: {
        username: 1,
        comment: 1,
        stars: 1,
        user_image: 1,
        created_at: 1,
        _id: 0,
      },
    },
  ];
  return pipeline;
};
