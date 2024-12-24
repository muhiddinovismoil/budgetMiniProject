import { Module } from '@nestjs/common';
import { BudgetModule } from './budget/budget.module';
import { BudgetController } from './budget/budget.controller';
import { BudgetService } from './budget/budget.service';

@Module({
  imports: [BudgetModule],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class AppModule {}
