import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetStatus } from '../enums/budget.enum';
import { UpdateBudgetDto } from './dto/update-budget.dto';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetService],
    }).compile();

    service = module.get<BudgetService>(BudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create new budget', () => {
    const mockData: CreateBudgetDto = {
      lesson: false,
      workOut: false,
      breakingTime: '10:30 AM',
      learningSkills: true,
      start_time: new Date('2024-12-23T09:00:00.000Z'),
      status: BudgetStatus.active,
      end_time: new Date('2024-12-23T17:00:00.000Z'),
    };
    const result = service.create(mockData);
    const expected = {
      msg: 'Budget Created',
      createdBudgetId: 2,
    };
    expect(result).toEqual(expected);
  });
  it('should get all budgets', () => {
    const mockResult: CreateBudgetDto[] = [
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
      budgets: mockResult,
    };
    const result = service.findAll();
    expect(result).toEqual(expected);
  });
  it('should get one budget', () => {
    const mockData: CreateBudgetDto = {
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
    const result = service.findOne(1);
    expect(result).toEqual(expected);
  });
  it('should update one budget', () => {
    const mockDataId = 1;
    const mockData: UpdateBudgetDto = {
      lesson: false,
    };
    const expected = {
      msg: 'Budget Updated',
      updatedBudgetId: mockDataId,
    };
    const result = service.update(mockDataId, mockData);
    expect(result).toEqual(expected);
  });
  it('should remove one budget', () => {
    const mockDataId = 1;
    const expected = {
      msg: 'Budget Deleted',
      deletedBudgetId: mockDataId,
    };
    const result = service.remove(mockDataId);
    expect(result).toEqual(expected);
  });
});
