import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Malindu:Il1JCo6cO0DJF6ax@cluster0.5pidi.mongodb.net/?retryWrites=true&w=majority',{dbName: 'myFirstDatabase'}), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
