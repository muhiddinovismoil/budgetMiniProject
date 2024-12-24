import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetStatus } from '../enums/budget.enum';
import { UpdateBudgetDto } from './dto/update-budget.dto';

describe('BudgetController', () => {
  let controller: BudgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [BudgetService],
    }).compile();

    controller = module.get<BudgetController>(BudgetController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call the service and should create new budget', () => {
    const mockData: CreateBudgetDto = {
      lesson: false,
      workOut: false,
      breakingTime: '10:30 AM',
      learningSkills: true,
      start_time: new Date('2024-12-23T09:00:00.000Z'),
      status: BudgetStatus.active,
      end_time: new Date('2024-12-23T17:00:00.000Z'),
    };
    const expected = {
      msg: 'Budget Created',
      createdBudgetId: 2,
    };
    const result = controller.create(mockData);
    expect(result).toEqual(expected);
  });
  it('should call the service and get all budgets', () => {
    const mockData: CreateBudgetDto[] = [
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
    const expected = {
      msg: 'All budgets',
      budgets: mockData,
    };
    const result = controller.findAll();
    expect(result).toEqual(expected);
  });
  it('should call the service and get one budget', () => {
    const mockData = {
      id: 1,
      lesson: false,
      workOut: false,
      breakingTime: '10:30 AM',
      learningSkills: true,
      start_time: new Date('2024-12-23T09:00:00.000Z'),
      status: BudgetStatus.active,
      end_time: new Date('2024-12-23T17:00:00.000Z'),
    };
    const expected = {
      msg: 'Budget by id',
      budget: mockData,
    };
    const result = controller.findOne('1');
    expect(result).toEqual(expected);
  });
  it('should call the service and update one budget', () => {
    const id = '1';
    const mockUpdateData: UpdateBudgetDto = {
      workOut: true,
      status: BudgetStatus.pending,
    };
    const expected = {
      msg: 'Budget Updated',
      updatedBudgetId: +id,
    };
    const result = controller.update(id, mockUpdateData);
    expect(result).toEqual(expected);
  });
  it('should call the service and delete one budget', () => {
    const mockId = '1';
    const expected = {
      msg: 'Budget Deleted',
      deletedBudgetId: +mockId,
    };
    const result = controller.remove(mockId);
    expect(result).toEqual(expected);
  });
});
