import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST'],
};
@WebSocketGateway({ transports: ['websocket'], cors: corsOptions })
export class OrderStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  clients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    this.server.emit('message', '1 cliente conectado');
    this.clients.set(client.id, client);

    // console.log('Client connected', client.id);
  }
  handleDisconnect(client: Socket) {
    // console.log('Client disconnected', client.id);
    this.clients.delete(client.id);
    this.server.emit('message', '1 cliente disconectado');
  }
}
