// location.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Location } from '@prisma/client';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async createLocation(@Body() data: Location): Promise<Location> {
    return this.locationService.createLocation(data);
  }

  @Get()
  async getAllLocations(): Promise<{
    data: Location[];
    page: number;
    totalPages: number;
  }> {
    const data = await this.locationService.getAllLocations();
    const page = 1;
    const totalPages = 1;
    return { data, page, totalPages };
  }

  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<Location | null> {
    return this.locationService.getLocationById(Number(id));
  }

  @Put(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() data: Location,
  ): Promise<Location> {
    return this.locationService.updateLocation(Number(id), data);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string): Promise<Location> {
    return this.locationService.deleteLocation(Number(id));
  }
}
