import { InjectRepository } from '@nestjs/typeorm';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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

  async handleConnection(client: Socket) {
    this.server.emit('message', '1 cliente conectado');
    this.clients.set(client.id, client);
  }
  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    this.server.emit('message', '1 cliente disconectado');
  }
}
