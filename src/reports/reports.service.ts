import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reports, ReportsDocument } from './schemas/reports.schemas';
import { Model, Mongoose, Types } from 'mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { GetReportByConditionDto } from './dto/get-report.dto';
import { DeleteReportDto } from './dto/delete-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Reports.name)
    private readonly reportItemModel: Model<ReportsDocument>,
  ) {}

  async create(reportItemModel: CreateReportDto) {
    let data = {};
    reportItemModel.date = new Date(reportItemModel.date);
    const { secretKey, ...createBody } = reportItemModel;
    if (secretKey === process.env.SECRET_KEY) {
      data = await this.reportItemModel.create(createBody);
    }

    return {
      success: secretKey === process.env.SECRET_KEY,
      data: data,
    };
  }

  async findOne(id: string) {
    const reportOfId = await this.reportItemModel
      .findOne({
        _id: id,
      })
      .exec();
    return {
      success: !!Object.keys(reportOfId).length,
      data: reportOfId || {},
    };
  }

  async findMany(skip: number, limit: number) {
    const find = await this.reportItemModel
      .find(
        {},
        {
          _id: 1,
          title: 1,
          description: 1,
          date: 1,
          week: 1,
          day: 1,
        },
      )
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip);
    return {
      success: !!find.length,
      data: find || [],
    };
  }

  async findAndUpdate(reportItemModel: UpdateReportDto) {
    reportItemModel.date = new Date(reportItemModel.date);
    const { _id, secretKey, ...reportBody } = reportItemModel;
    let data = {};

    if (secretKey === process.env.SECRET_KEY) {
      data = await this.reportItemModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(_id),
        },
        reportBody,
        {
          returnDocument: 'after',
        },
      );
    }

    return {
      success: secretKey === process.env.SECRET_KEY,
      data: data || {},
    };
  }

  async maxDocumentConditions(conditions: GetReportByConditionDto[]) {
    return this.reportItemModel.countDocuments(
      conditions.reduce((prev, curr) => {
        prev[curr[0]] = curr[1];
        return prev;
      }, {}),
    );
  }

  async findByConditions(
    skip: number,
    limit: number,
    conditions: GetReportByConditionDto[],
  ) {
    return this.reportItemModel
      .find(
        conditions.reduce((prev, curr) => {
          if (curr.field === 'date') {
            if (curr.data.length !== 0) {
              prev[curr.field] = curr.data;
            }
          } else if (curr.data !== '' && parseInt(curr.data) !== 0) {
            prev[curr.field] = curr.data;
          }
          return prev;
        }, {}),
      )
      .skip(skip)
      .limit(limit);
  }

  async deleteById(query: DeleteReportDto) {
    let data = {};
    const { id, secretKey } = query;
    if (secretKey === process.env.SECRET_KEY) {
      data = await this.reportItemModel.deleteOne({
        _id: new Types.ObjectId(id),
      });
    }

    return {
      success: secretKey === process.env.SECRET_KEY,
      data: data,
    };
  }
}
