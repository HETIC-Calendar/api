import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '@/app.module';
import { DomainErrorFilter } from '@/config/domain-error.filter';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new DomainErrorFilter());
    await app.init();
  });

  describe('/ (GET)', () => {
    it('should return "Hello John Doe!"', () => {
      return request(app.getHttpServer())
        .get('/?name=John Doe')
        .expect(200)
        .expect('Hello, John Doe!');
    });

    it('should return 400 if name is not provided', () => {
      return request(app.getHttpServer()).get('/').expect(400).expect({
        statusCode: 400,
        message: 'Name is required!',
      });
    });
  });
});
