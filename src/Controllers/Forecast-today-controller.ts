import { Controller, Get, Query } from "@nestjs/common";
import { ForecastWeatherNowService } from "../Services/Forecast_service_Weather_now";

@Controller('today')
export class forecastWeatherTodayController{
    constructor(private readonly forecastServiceWeatherToday:  ForecastWeatherNowService ){}; // Injects the ForecastService for use in this controller

    @Get() // Handles GET requests to the '/forecast' endpoint
    async getHumitity ( // Method to handle the request and return forecast data
        @Query('lat') lat: number, // Retrieves latitude from the query parameters
        @Query('lon') lon:number, // Retrieves longitude from the query parameters
    
       /* To be able to change the response to an object rather than a string,
        it is necessary to change `Promise<string>` to `Promise<object>`. */
    ): Promise<object> { // Returns a promise that resolves to a HumidityResponse object
        return this.forecastServiceWeatherToday.weatherTodayFindAll(lat,lon); // Calls the findAll method of ForecastService to get the forecast data
    }
}