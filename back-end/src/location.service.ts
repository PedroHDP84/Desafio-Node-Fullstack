// location.service.ts
import { Injectable } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async createLocation(data: Prisma.LocationCreateInput): Promise<Location> {
    return this.prisma.location.create({ data });
  }

  async getLocationById(id: number): Promise<Location | null> {
    return this.prisma.location.findUnique({ where: { id } });
  }

  async updateLocation(
    id: number,
    data: Prisma.LocationUpdateInput,
  ): Promise<Location> {
    return this.prisma.location.update({ where: { id }, data });
  }

  async deleteLocation(id: number): Promise<Location> {
    return this.prisma.location.delete({ where: { id } });
  }

  async getAllLocations(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }
}
