import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.entity';
import { CommentSchema } from './comment.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"posts",schema: PostSchema },{name:"comments",schema: CommentSchema}])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
