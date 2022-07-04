import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Posts } from './post.entity';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'posts' })
  post: Posts;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
