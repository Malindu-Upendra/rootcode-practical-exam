import { Body, Controller, Get , Post} from '@nestjs/common';
import { Posts } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postService.getAllPosts();
  }

  @Post()
  createPost(@Body() post: Posts): Promise<Posts> {
    return this.postService.createPost(post);
  }

  @Post('comment')
  addComment(@Body() comment: any): Promise<any> {
    return this.postService.addComment(comment);
  }
}
