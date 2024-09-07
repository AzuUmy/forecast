import { Controller, Get, Post, Param, Body,  } from '@nestjs/common';
import { weatherNow } from "../../Interfaces/Forecast_interface";
import { ForecastHistoryService } from 'src/Services/forecast-hisotry-service';

// Method to handle the type of the request weather is post our get
@Controller('hisotry')
export class ForecastHistoryController {

    constructor(private readonly  forecastHistoryService: ForecastHistoryService ) {};

    @Post() // Post method
    async create(@Body() createForecastHistoryDto:  weatherNow) : Promise<weatherNow>{
        return this.forecastHistoryService.create(createForecastHistoryDto);
    }


    @Get('name/:name') // Querys data based on the name
    async findByName(@Param('name') name: string): Promise<weatherNow[]> {
        return this.forecastHistoryService.findByName(name);
    }
}