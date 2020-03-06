import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.interface';
import { CreateCategoryDto } from './create-category.dto';
import { EditCategoryDto } from './edit-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.
      categoryModel(createCategoryDto)
      .save();
    return category;
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryModel
      .find()
      .exec()
    return categories;
  }

  async getCategory(id: string): Promise<Category> {
    const category = await this.categoryModel
      .findById(id)
      .exec()
    return category;
  }

  async edit(editCategoryDto: EditCategoryDto, id: string): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, editCategoryDto, { new: true });
    return category;
  }

  async getSubcategories(id: string) {
    const category = await this.categoryModel
      .find({ parentCategory: id })
      .exec();
    return category;
  }

}
