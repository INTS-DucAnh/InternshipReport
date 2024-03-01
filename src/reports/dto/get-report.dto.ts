export class GetReportDto {
  report?: string;
  title?: string;
  date: Date;
  week: number;
  day: number;
}
export class GetReportByConditionDto {
  field: string;
  data: string;
}

export class GetReportQueryDto {
  skip: number;
  limit: number;
  week?: number;
  day?: number;
}

export class FindReportQueryDto {
  skip: number;
  limit: number;
  day?: number;
  week?: number;
  date?: Date;
}
