import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './comment.entity';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Posts);
