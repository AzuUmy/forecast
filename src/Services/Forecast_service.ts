import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { HumidityResponse } from "../Interfaces/Forecast_interface";

@Injectable()
export class ForecastService { // - class to interact with api and general response for the request

    private readonly apiKey = "6f324290ec6be1796ba64faf5c959ebb"; // api key - hardcoded for easyer implementation
    private readonly apiUrl = "https://api.openweathermap.org/data/2.5/weather"; // api endpoint url

    constructor(private readonly httpService: HttpService) {} // constructor for the  httpService used to request data fromn the endpoint

    // Function to check if the user Humidity inputed by user is near the value of the api
    private isClose(actual: number, user: number, threshold: number): boolean {
        return Math.abs(actual - user) <= threshold;
    }

    /* Method to consume data an return based on user input value 
    -note this  method recives the geolocation and the value  of Humidity inputed by the user, those values are used
    to built the query  */ 
    async findAll(lat: number, lon: number, userHumidity: string): Promise<HumidityResponse> {
        try {
            const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`; // Building the query based on user input data

            const response = await firstValueFrom(this.httpService.get(url)); // variable to retrive the data from the endpoint

            const apiHumidity = response.data.main?.humidity; // passes the value of Humidity into the variable
            const locationName = response.data?.name; // passes the value of name wiche in this case is the location name  exmple - (Curitiba) into the variable
            const userHumidityToNumber = Number(userHumidity); // the value inputed by the user is recived as a string and converted to a Number

             //this variable recives a method to calculate if the number imputed by the user is close to the one recived by the api
            const isCloseToActual = this.isClose(apiHumidity, userHumidityToNumber, 5);

            let humidityComparison: string; // this set the return desired on the body of the request

            // checks if the Humidity informed matches the api is close our does not matches the recived one
            if (apiHumidity === userHumidityToNumber) {
                humidityComparison = 'Matched';
            } else if (isCloseToActual) {
                humidityComparison = 'Close';
            } else {
                humidityComparison = 'Not Matched';
            }

            // mounts the body of the request returning the humidityComparison customized info -- note this is based on a custom interface
            const humidityResponse: HumidityResponse = { // HumidityResponse is a custom interface to return data based on desired info
                comparison: `Humidity ${userHumidityToNumber} reported by the user is ${humidityComparison}.`,
                humidityInfo: {
                    feedback: `The Humidity in ${locationName} is ${apiHumidity}% At the moment.`,
                }
            };

            // return the body of the request
            return humidityResponse;
        } catch (err) { // error handller
            throw new HttpException('Failed to fetch weather data', HttpStatus.BAD_REQUEST);
        }
    }
}