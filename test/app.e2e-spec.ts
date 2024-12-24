import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BudgetStatus } from '../src/enums/budget.enum';
import { CreateBudgetDto } from '../src/budget/dto/create-budget.dto';

describe('BudgetController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  it('/budget (POST)', async () => {
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
    return request(app.getHttpServer())
      .post('/budget')
      .send(mockData)
      .expect(201)
      .expect(expected);
  });

  it('/budget (GET)', async () => {
    const expected = {
      msg: 'All budgets',
      budgets: [
        {
          id: 1,
          lesson: false,
          workOut: false,
          breakingTime: '10:30 AM',
          learningSkills: true,
          start_time: '2024-12-23T09:00:00.000Z',
          status: BudgetStatus.active,
          end_time: '2024-12-23T17:00:00.000Z',
        },
        {
          id: 2,
          lesson: false,
          workOut: false,
          breakingTime: '10:30 AM',
          learningSkills: true,
          start_time: '2024-12-23T09:00:00.000Z',
          status: BudgetStatus.active,
          end_time: '2024-12-23T17:00:00.000Z',
        },
      ],
    };
    return request(app.getHttpServer())
      .get('/budget')
      .expect(200)
      .expect(expected);
  });

  it('/budget/1 (GET)', async () => {
    const expected = {
      id: 1,
      lesson: false,
      workOut: false,
      breakingTime: '10:30 AM',
      learningSkills: true,
      start_time: '2024-12-23T09:00:00.000Z',
      status: BudgetStatus.active,
      end_time: '2024-12-23T17:00:00.000Z',
    };

    return request(app.getHttpServer())
      .get('/budget/1')
      .expect(200)
      .expect({ msg: 'Budget by id', budget: expected });
  });

  it('/budget/1 (PATCH)', async () => {
    const updatedData = { lesson: true };

    return request(app.getHttpServer())
      .patch('/budget/1')
      .send(updatedData)
      .expect(200)
      .expect({
        msg: 'Budget Updated',
        updatedBudgetId: 1,
      });
  });

  it('/budget/1 (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/budget/1')
      .expect(200)
      .expect({ msg: 'Budget Deleted', deletedBudgetId: 1 });
  });
});
