import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ApiInfo } from "src/API/Api_key_url";
import { ForecastToday } from "src/Model/Forecast_today_model";
import { weatherNow } from "src/Interfaces/Forecast_interface";
import { ForecastHistoryService } from "./forecast-hisotry-service";

@Injectable()
export class ForecastWeatherNowService extends ApiInfo { // Class extend to ApiInfo to collect the value of api key and the url

    constructor(
        private readonly httpService: HttpService,
        private readonly forecastHistoryService: ForecastHistoryService
    ) {  // Constructor for the  httpService used to request data fromn the endpoint
        super();
    } 

    /* This method return the weather based info from the Api  
    - differente from the previous method this returns a object the porpouse is that this data can be used more easyli 
    in another implementation such as a frontend aplication that interacts with this server and the avaible enpoint for this service*/
    async weatherTodayFindAll(lat: number, lon: number) : Promise<object> {
        try {
            const  url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.getKey()}&units=metric&lang=${this.lang}`; // Building the query based on user input data
            const response = await firstValueFrom(this.httpService.get(url)); // Variable to retrive the data from the endpoint

            // Asing the values from the api to specific variables
            const cordInfo = response.data.coord; 
            const weatherInfo = response.data.weather;
            const mainInfo = response.data.main;
            const windInfo = response.data.wind;
            const infoInfo = {
                country: response.data.sys.country,
                timeZone: response.data.timezone,
                name: response.data.name
            };


            // Creates a new ForecastToday object to pass data into 
            const weatherTodayNow = new ForecastToday(cordInfo, weatherInfo, mainInfo, windInfo, infoInfo);

           
                await this.forecastHistoryService.create(weatherTodayNow);
           
        
            // All the json objet to return the data in the object type tailored in a custom json format
            return weatherTodayNow.toJSON();

        } catch (err) {// Error handling
            throw new HttpException('Failed to fetch weather data', HttpStatus.BAD_REQUEST);
        }
      
    }
}