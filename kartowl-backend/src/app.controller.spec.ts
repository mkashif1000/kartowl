import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        // Mock all dependencies
        { provide: 'CACHE_MANAGER', useValue: { get: jest.fn(), set: jest.fn() } },
        { provide: 'DarazService', useValue: { searchProduct: jest.fn().mockResolvedValue([]) } },
        { provide: 'PriceOyeService', useValue: { searchProduct: jest.fn().mockResolvedValue([]) } },
        { provide: 'TelemartService', useValue: { searchProduct: jest.fn().mockResolvedValue([]) } },
        { provide: 'OlxService', useValue: { searchProduct: jest.fn().mockResolvedValue([]) } },
        { provide: 'HistoryService', useValue: { getHistory: jest.fn(), addPricePoint: jest.fn() } },
        { provide: 'AlertsService', useValue: { sendConfirmation: jest.fn() } },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
