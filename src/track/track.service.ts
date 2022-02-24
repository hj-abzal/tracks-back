import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schema/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable({})
export class TrackService {
  constructor(@InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
              @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>) {
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    return await this.TrackModel.create({ ...dto, listens: 0 });
  }

  async getALl(): Promise<Track[]> {
    return this.TrackModel.find();
  }

  async getOne(id: ObjectId): Promise<Track> {
    return this.TrackModel.findById(id).populate('comments');
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.TrackModel.findByIdAndDelete(id);
    return res._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.TrackModel.findById(dto.trackId);
    const comment = await this.CommentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}