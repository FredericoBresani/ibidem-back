import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleModel } from 'src/shared/models/article.model';
import { ArticleDto } from './dtos/article.dto';
import { Article } from './schemas/article.schema';
import { ApiAccessGuard } from 'src/auth/guards/api-access.guard';
import { ArticleFilter } from 'src/shared/models/article-filter.model';

@UseGuards(ApiAccessGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly blogService: ArticlesService) {}

  @Get()
  public getArticles(@Query() filter: ArticleFilter): Promise<ArticleModel[]> {
    return this.blogService.getAll(filter);
  }

  @Get('by-id/:id')
  public getArticleById(@Param('id') id: string): Promise<ArticleModel> {
    return this.blogService.getArticleById(id);
  }

  @Get('categories')
  public getArticleCategories(): Promise<string[]> {
    return this.blogService.getArticleCategories();
  }

  @Get('most-viewed')
  public getMostViewedArticles(): Promise<ArticleModel[]> {
    return this.blogService.getMostViewedArticles();
  }

  @Get('search-article/:caracters')
  public searchArticle(
    @Param('caracters') caracters: string,
  ): Promise<ArticleModel[]> {
    return this.blogService.searchArticle(caracters);
  }

  @Post()
  public insertArticle(@Body() Article: ArticleDto): Promise<Article> {
    return this.blogService.insertArticle(Article);
  }
}
