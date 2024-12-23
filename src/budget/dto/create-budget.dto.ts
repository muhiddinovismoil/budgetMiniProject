import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BudgetStatus } from '../../enums/budget.enum';
export class CreateBudgetDto {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsBoolean()
  lesson: boolean;
  @IsBoolean()
  workOut: boolean;
  @IsString()
  breakingTime: string;
  @IsBoolean()
  learningSkills: boolean;
  @IsDate()
  @Type(() => Date)
  start_time: Date;
  @IsEnum(BudgetStatus)
  status: BudgetStatus;
  @IsDate()
  @Type(() => Date)
  end_time: Date;
}
