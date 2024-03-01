import { Module } from '@nestjs/common';
import { ReportController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reports, ReportsSchemas } from './schemas/reports.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reports.name, schema: ReportsSchemas }]),
  ],
  controllers: [ReportController],
  providers: [ReportsService],
})
export class ReportModule {}
