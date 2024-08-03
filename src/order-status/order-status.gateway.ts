import { InjectRepository } from '@nestjs/typeorm';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST'],
};
@WebSocketGateway({ transports: ['websocket'], cors: corsOptions })
export class OrderStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}
  @WebSocketServer() server: Server;
  clients: Map<string, Socket> = new Map();

  async emitNewOrder(orderId: number) {
    const order = await this.orderRepository.find({ where: { id: orderId }, relations: { orderItems: { item: true } } });
    this.server.emit('ORDER-CREATED', order);
  }

  // @SubscribeMessage('orders')
  // async handleOrders(client: Socket): Promise<string> {
  //   const orders = await this.orderRepository.find({ relations: { orderItems: { item: true } } });

  //   client.emit('orders', orders);

  //   return 'ok';
  // }

  // @SubscribeMessage('message')
  // handleEvent(@MessageBody('id') id: number): number {
  //   return id;
  // }

  handleConnection(client: Socket) {
    this.clients.set(client.id, client);
  }
  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }
}
