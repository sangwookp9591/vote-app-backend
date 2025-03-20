import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest
                .fn()
                .mockResolvedValue([
                  { id: '1', name: 'John Doe', email: 'test@example.com' },
                ]),
              findUnique: jest.fn().mockResolvedValue({
                id: '1',
                name: 'John Doe',
                email: 'test@example.com',
              }),
              create: jest.fn().mockResolvedValue({
                id: '2',
                name: 'New User',
                email: 'new@example.com',
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should return all users', async () => {
    expect(await service.findAll()).toEqual([
      { id: '1', name: 'John Doe', email: 'test@example.com' },
    ]);
  });

  it('should return a single user', async () => {
    expect(await service.findOne('1')).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'test@example.com',
    });
  });

  it('should create a user', async () => {
    expect(await service.create('new@example.com', 'New User')).toEqual({
      id: '2',
      name: 'New User',
      email: 'new@example.com',
    });
  });
});
