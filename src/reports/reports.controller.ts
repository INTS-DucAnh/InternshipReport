import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { query } from 'express';
import {
  FindReportQueryDto,
  GetReportByConditionDto,
  GetReportQueryDto,
} from './dto/get-report.dto';
import { DeleteReportDto } from './dto/delete-report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportsService) {}

  @Get('find')
  async findDoc(@Query() query: FindReportQueryDto) {
    const { skip, limit, ...options } = query;
    const condition = Object.entries(options).reduce((prev, curr) => {
      if (!!curr[1]) prev.push({ field: curr[0], data: curr[1] });
      return prev;
    }, []);
    const dataRes = await this.reportService.findByConditions(
      skip,
      limit,
      condition,
    );
    return {
      success: dataRes.length,
      data: dataRes,
    };
  }

  @Get('/:id')
  getReport(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }
  @Get('')
  async getAll(@Query() query: GetReportQueryDto) {
    const { skip, limit, ...fields } = query;
    const arrFilter = Object.entries(fields).reduce((prev, curr) => {
      prev.push({
        field: curr[0],
        data: curr[1],
      });
      return prev;
    }, []);

    const max = await this.reportService.maxDocumentConditions(arrFilter);
    const dataRes = await this.reportService.findByConditions(
      skip,
      limit,
      arrFilter,
    );

    return {
      max: max,
      data: dataRes,
    };
  }

  @Post('/create')
  createReport(@Body() createReport: CreateReportDto) {
    return this.reportService.create(createReport);
  }

  @Put('/update')
  updateReport(@Body() updateReport: UpdateReportDto) {
    return this.reportService.findAndUpdate(updateReport);
  }

  @Delete('/delete')
  deleteReport(@Query() query: DeleteReportDto) {
    return this.reportService.deleteById(query);
  }
}
