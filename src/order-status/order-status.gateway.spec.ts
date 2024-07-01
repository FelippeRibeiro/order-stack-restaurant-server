import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusGateway } from './order-status.gateway';

describe('OrderStatusGateway', () => {
  let gateway: OrderStatusGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStatusGateway],
    }).compile();

    gateway = module.get<OrderStatusGateway>(OrderStatusGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
