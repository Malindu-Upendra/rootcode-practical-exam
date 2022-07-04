import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts, PostDocument } from './post.entity';
import { Comment, CommentDocument } from './comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('posts') private postModel: Model<PostDocument>,
    @InjectModel('comments') private commentModel: Model<CommentDocument>,
  ) {}

  //retireveing all the post with joining comments table
  async getAllPosts(): Promise<Posts[]> {
    return this.postModel.find().populate('comments').exec();
  }

  //creating a post
  async createPost(post: any): Promise<Posts> {
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  // 1. creating a comment to get the reference
  // 2. saving it to the myFirstDatabase
  // 3. finding the post that comment related to
  // 4. pushed the comment into that object
  // 5 used save method to update that post
  async addComment(data: any): Promise<any> {
    const createdComment = await this.commentModel.create({
      comment: data.comment,
    });
    await createdComment.save();
    const post = await this.postModel.findById(data.id);
    post.comments.push(createdComment);
    return await post.save();
  }
}
