import { Module } from '@nestjs/common';

import { TodoitemsModule } from './todoitems/todoitems.module';
import { ReportModule } from './reports/reports.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TodoitemsModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
