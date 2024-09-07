import { Controller, Get, Query } from "@nestjs/common";
import {ForecastServiceHumidity  } from "../Services/Forecast_service_humidity";

@Controller('humidity') // Sets the route for this controller 
export class forecastHumitityController {  // Class responsible for handling incoming HTTP requests
     
    constructor(private readonly forecastServiceHumitity:  ForecastServiceHumidity ){}; // Injects the ForecastService for use in this controller

    @Get() // Handles GET requests to the '/forecast' endpoint
        async getHumitity ( // Method to handle the request and return forecast data
            @Query('lat') lat: number, // Retrieves latitude from the query parameters
            @Query('lon') lon:number, // Retrieves longitude from the query parameters
            @Query('userHumidity') userHumidity: number // Retrieves imputed humidity from the query parameters

           /* To be able to change the response to an object rather than a string,
            it is necessary to change `Promise<string>` to `Promise<object>`. */
        ): Promise<string> { // Returns a promise that resolves to a HumidityResponse object
            return this.forecastServiceHumitity.humitityFindAll(lat,lon,userHumidity); // Calls the findAll method of ForecastService to get the forecast data
        }
}