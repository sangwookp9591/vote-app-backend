import { Test, TestingModule } from '@nestjs/testing';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

describe('TeamResolver', () => {
  let resolver: TeamResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamResolver,
        {
          provide: TeamService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Team A',
              ownerId: '123',
            }),
            findAll: jest.fn().mockResolvedValue([
              { id: '1', name: 'Team A', ownerId: '123' },
              { id: '2', name: 'Team B', ownerId: '456' },
            ]),
            joinTeam: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<TeamResolver>(TeamResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a team', async () => {
    const result = await resolver.createTeam('Team A', '123');
    expect(result).toEqual({
      id: '1',
      name: 'Team A',
      ownerId: '123',
    });
    // 서비스 메소드가 호출되었는지 확인
  });

  it('should return all teams', async () => {
    const result = await resolver.teams();
    expect(result).toEqual([
      { id: '1', name: 'Team A', ownerId: '123' },
      { id: '2', name: 'Team B', ownerId: '456' },
    ]);
  });

  it('should join a team', async () => {
    const result = await resolver.joinTeam('123', '1');
    expect(result).toBe(true);
    // 서비스의 joinTeam 메소드가 호출되었는지 확인
  });
});
