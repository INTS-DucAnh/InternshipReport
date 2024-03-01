export class UpdateReportDto {
  _id: string;
  title: string;
  description: string;
  date: Date;
  week: number;
  day: number;
  report?: string;
  secretKey: string;
}
