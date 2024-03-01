export class CreateReportDto {
  report: string;
  title: string;
  description: string;
  date: Date;
  week: number;
  day: number;
  secretKey: string;
}
