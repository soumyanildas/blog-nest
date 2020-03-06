import { Controller, Post, UseGuards, UseFilters, Body, Res, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/filters/mongo-exception/mongo-exception.filter';
import { CreateCategoryDto } from './create-category.dto';
import { EditCategoryDto } from './edit-category.dto';

@Controller()
export class CategoriesController {

  constructor(
    private readonly categoryService: CategoriesService
  ) { }

  @Post('categories')
  @UseFilters(MongoExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: any) {
    await this.categoryService.create(createCategoryDto);
    return res.status(HttpStatus.OK).json({
      error: false,
      message: 'Category has been created successfully'
    });
  }

  @Get('categories')
  @UseFilters(MongoExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  async getCategories(@Res() res: any) {
    const categories = await this.categoryService.getCategories();
    return res.status(HttpStatus.OK).json({
      error: false,
      categories
    });
  }

  @Get('category/:id')
  @UseFilters(MongoExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  async getCategory(@Param('id') id: string, @Res() res: any) {
    const category = await this.categoryService.getCategory(id);
    if (category) {
      return res.status(HttpStatus.OK).json({
        error: false,
        category
      });
    }
    return res.status(HttpStatus.NOT_FOUND).json({
      error: true,
      message: 'Category not found'
    });
  }

  @Put('category/:id')
  @UseFilters(MongoExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  async edit(@Body() editCategoryDto: EditCategoryDto, @Param('id') id: string, @Res() res: any) {
    const category = await this.categoryService.edit(editCategoryDto, id);
    if (category) {
      return res.status(HttpStatus.OK).json({
        error: false,
        message: 'Category has been updated successfully',
        category
      });
    }
    return res.status(HttpStatus.NOT_FOUND).json({
      error: true,
      message: 'Category not found'
    });
  }

  @Get('category/:id/subcategories')
  @UseFilters(MongoExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  async getSubcategories(@Param('id') id: string, @Res() res: any) {
    const subCategories = await this.categoryService.getSubcategories(id);
    return res.status(HttpStatus.OK).json({
      error: false,
      subCategories
    });
  }

}
