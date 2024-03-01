import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportsDocument = Reports & Document;

@Schema()
export class Reports {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  report: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  week: number;

  @Prop({ required: true })
  day: number;
}

export const ReportsSchemas = SchemaFactory.createForClass(Reports);
