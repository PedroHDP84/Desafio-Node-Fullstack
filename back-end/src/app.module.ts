import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LocationController } from './location.controller';
import { EventController } from './event.controller';
import { AppService } from './app.service';
import { LocationService } from './location.service';
import { EventService } from './event.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, LocationController, EventController],
  providers: [AppService, LocationService, EventService, PrismaService],
})
export class AppModule {}
