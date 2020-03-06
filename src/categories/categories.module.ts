import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
  ],
  providers: [CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule { }
