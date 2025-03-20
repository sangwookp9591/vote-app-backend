import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findAll: jest.fn().mockResolvedValue([
                {
                  id: '1',
                  name: 'Team A',
                  ownerId: '123',
                  owner: {
                    id: '123',
                    name: 'John Doe',
                    email: 'john@example.com',
                  }, // owner 정보 포함
                },
              ]),
              joinTeam: jest.fn().mockResolvedValue({
                userId: '1',
                teamId: '1',
              }),
              create: jest.fn().mockResolvedValue({
                name: 'Team name',
                ownerId: '1',
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  it('should return all users', async () => {
    expect(await service.findAll()).toEqual([
      { id: '1', name: 'John Doe', email: 'test@example.com' },
    ]);
  });

  it('should return a single user', async () => {
    expect(await service.joinTeam('1', '1')).toEqual({
      userId: '1',
      teamId: '1',
    });
  });

  it('should create a user', async () => {
    expect(await service.create('Team name', '1')).toEqual({
      name: 'Team name',
      ownerId: '1',
    });
  });
});
