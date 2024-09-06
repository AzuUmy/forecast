import { Controller, Get, Query } from "@nestjs/common";
import {ForecastService  } from "../Services/Forecast_service";
import { HumidityResponse } from "../Interfaces/Forecast_interface";

@Controller('forecast') // sets the route for this controller 
export class forecastController {  // Class responsible for handling incoming HTTP requests
     
    constructor(private readonly forecastService:  ForecastService ){}; // Injects the ForecastService for use in this controller

    @Get() // Handles GET requests to the '/forecast' endpoint
        async getForecast ( // Method to handle the request and return forecast data
            @Query('lat') lat: number, // Retrieves latitude from the query parameters
            @Query('lon') lon:number, // Retrieves longitude from the query parameters
            @Query('userHumidity') userHumidity:string // Retrieves imputed humidity from the query parameters

        ): Promise<HumidityResponse> { // Returns a promise that resolves to a HumidityResponse object
            return this.forecastService.findAll(lat,lon,userHumidity);// Calls the findAll method of ForecastService to get the forecast data
        }
}