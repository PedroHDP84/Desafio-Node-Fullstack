// event.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Event, EventType } from '@prisma/client';
import { EventService } from './event.service';
import { PrismaService } from './prisma.service';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async createEvent(
    @Body()
    data: {
      name: string;
      type: EventType;
      startDate: Date;
      endDate: Date;
      locationId: number;
      phone: string;
      email: string;
    },
  ): Promise<Event> {
    const location = await this.prisma.location.findUnique({
      where: { id: data.locationId },
    });
    if (!location) {
      throw new Error('Location not found');
    }

    const newData = {
      name: data.name,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      email: data.email,
      phone: data.phone,
      location: {
        connect: { id: location.id },
      },
    };

    return this.eventService.createEvent(newData);
  }

  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.getEventById(Number(id));
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() data: Event,
  ): Promise<Event> {
    return this.eventService.updateEvent(Number(id), data);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<Event> {
    return this.eventService.deleteEvent(Number(id));
  }
}
