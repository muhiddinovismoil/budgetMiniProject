import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BudgetStatus } from '../enums/budget.enum';

@Injectable()
export class BudgetService {
  budget: CreateBudgetDto[] = [
    {
      id: 1,
      lesson: false,
      workOut: false,
      breakingTime: '10:30 AM',
      learningSkills: true,
      start_time: new Date('2024-12-23T09:00:00.000Z'),
      status: BudgetStatus.active,
      end_time: new Date('2024-12-23T17:00:00.000Z'),
    },
  ];
  create(createBudgetDto: CreateBudgetDto) {
    const id = this.budget.length + 1;
    this.budget.push({ id, ...createBudgetDto });
    return {
      msg: 'Budget Created',
      createdBudgetId: id,
    };
  }
  findAll() {
    if (this.budget.length == 0) {
      throw new NotFoundException('Budgets not found');
    }
    return {
      msg: 'All budgets',
      budgets: this.budget,
    };
  }
  findOne(id: number) {
    const findById = this.budget.findIndex((item) => item.id == id);
    if (findById < 0) {
      throw new NotFoundException('Budget not found');
    }
    return {
      msg: 'Budget by id',
      budget: this.budget[findById],
    };
  }
  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const existingBudget = this.budget.find((item) => item.id === id);
    if (!existingBudget) {
      throw new NotFoundException('Budget not found');
    }
    const updatedBudget = { ...existingBudget, ...updateBudgetDto };
    const budgetIndex = this.budget.findIndex((item) => item.id === id);
    this.budget[budgetIndex] = updatedBudget;
    return { msg: 'Budget Updated', updatedBudgetId: id };
  }
  remove(id: number) {
    const findById = this.budget.findIndex((item) => item.id == id);
    if (findById < 0) {
      throw new NotFoundException('Budget not found');
    }
    this.budget.splice(findById, 1);
    return {
      msg: 'Budget Deleted',
      deletedBudgetId: id,
    };
  }
}
