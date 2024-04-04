import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ArticleModel } from 'src/shared/models/article.model';
import { ArticleDto } from './dtos/article.dto';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import * as magic from '../shared/constants/constants';
import { ArticleFilter } from 'src/shared/models/article-filter.model';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
@Injectable()
export class ArticlesService {
  constructor(
    @Inject(magic.ARTICLE_MODEL) private articleModel: Model<Article>,
    private readonly mailSenderService: MailSenderService,
  ) {}

  public async getAll(filter: ArticleFilter): Promise<ArticleModel[]> {
    if (filter.new) {
      const articles = await this.articleModel.find().sort({ _id: -1 });
      return articles;
    } else if (filter.most_viewed) {
      const articles = await this.articleModel
        .find()
        .sort({ access_count: -1 });
      return articles;
    } else if (filter.best_rating) {
      const articles = await this.articleModel.find();
      return articles;
    } else if (filter.category) {
      const articles = await this.articleModel.find({
        category: filter.category,
      });
      return articles;
    }
  }

  public async getArticleCategories(): Promise<string[]> {
    const categories = await this.articleModel.distinct('category');
    return categories;
  }

  public async searchArticle(caracters: string): Promise<ArticleModel[]> {
    const articles = await this.articleModel.find({
      title: { $regex: caracters, $options: 'ˆi' },
    });
    return articles;
  }

  public async getArticleById(id: string): Promise<ArticleModel> {
    const article = await this.articleModel.findOne({ _id: id });
    const updatedarticle = Object.assign(article, {
      access_count: (article.access_count || 0) + 1,
    });
    return updatedarticle.save();
  }

  public async getMostViewedArticles(): Promise<ArticleModel[]> {
    const articles = await this.articleModel
      .find()
      .sort({ access_count: -1 })
      .limit(2);
    return articles;
  }

  public async insertArticle(articleDto?: ArticleDto): Promise<Article> {
    const articleExists = await this.articleModel.findOne(
      {
        $and: [{ author: articleDto.author }, { title: articleDto.title }],
      },
      { _id: 1 },
    );
    if (articleExists?._id) {
      throw new UnauthorizedException('ARTICLE_NAME_IN_USE');
    }
    const article = new this.articleModel(articleDto);
    return article.save();
  }
}
