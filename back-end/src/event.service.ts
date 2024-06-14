// event.service.ts
import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({ data });
  }

  async getEventById(id: number): Promise<Event | null> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async updateEvent(id: number, data: Prisma.EventUpdateInput): Promise<Event> {
    return this.prisma.event.update({ where: { id }, data });
  }

  async deleteEvent(id: number): Promise<Event> {
    return this.prisma.event.delete({ where: { id } });
  }

  async getAllEvents(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }
}
