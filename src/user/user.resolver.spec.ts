import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

//Test block 생성
describe('UserResolver', () => {
  let resolver: UserResolver;

  //테스트 환경 설정
  beforeEach(async () => {
    //Test.createTestingModule()로 테스트 환경을 만듦
    // providers(제공자)를 설정해서 UserResolver와 UserService를 테스트에 등록
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          //UserService를 가짜(Mock)로 만듦
          useValue: {
            //함수이름(provide의 UserService의 이름과 같아야함) : 리턴값
            findAll: jest
              .fn()
              .mockResolvedValue([
                { id: '1', name: 'John Doe', email: 'test@example.com' },
              ]),
            findOne: jest.fn().mockResolvedValue({
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
      ],
    }).compile();
    //UserResolver의 인스턴스를 가져와서 resolver 변수에 저장
    //resolver.users(), resolver.user(id), resolver.createUser(email, name) 같은 테스트가능
    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should return all users', async () => {
    expect(await resolver.users()).toEqual([
      { id: '1', name: 'John Doe', email: 'test@example.com' },
    ]);
  });

  it('should return a single user', async () => {
    expect(await resolver.user('1')).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'test@example.com',
    });
  });

  it('should create a user', async () => {
    expect(await resolver.createUser('new@example.com', 'New User')).toEqual({
      id: '2',
      name: 'New User',
      email: 'new@example.com',
    });
  });
});
