import { Controller, Get, Query } from "@nestjs/common";
import { ForecastInteligence } from "../Services/Forecast_intel.service";
import { ForecastIntelResponse } from "src/Interfaces/Intel-forecast-object";

@Controller('inteligence')
export class forecastInteligenceData{
    constructor(private readonly forecastInteligence:  ForecastInteligence ){}; // Injects the ForecastService for use in this controller
    
// Method to query the ddata based on the state name
    @Get()
    async getIntelSenseData(
        @Query('stateName') stateName:string // Expects a state name on the query
    ): Promise<string> {
        return this.forecastInteligence.findIntelData(stateName); // Returns the founded data base on state name
    }
}