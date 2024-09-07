import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs"
import { HumidityToday } from "src/Model/Humidity_today_model";
import { ApiInfo } from "src/API/Api_key_url"; 

@Injectable()
export class ForecastServiceHumidity extends ApiInfo { //  Class to interact with the API and provide a general response for the request

   constructor(private readonly httpService: HttpService) { // Constructor for the  httpService used to request data fromn the endpoint
       super();
   } 

// Function to check if the user's inputted humidity is close to the value from the API
private isClose(actual: number, user: number, threshold: number): boolean {
        return Math.abs(actual - user) <= threshold;
    }
        /* Method to consume data and return based on the user input value 
        - Note: This method receives the geolocation and the value of humidity inputted by the user. These values are used
        to build the query. This method currently returns a string because the expected return is a custom message 
        crafted by overriding the `toString` method for more tailored responses. */

        /* Example of usage as an object tailored by `toJSON`:
        - `async findAll(lat: number, lon: number, userHumidity: number): Promise<object>` 
        - By returning the data as an object, the method now expects an object rather than a string. */
    async humitityFindAll(lat: number, lon: number, userHumidity: number): Promise<string> {
      
        try {
            const  url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.getKey()}&units=metric`; // Building the query based on user input data
            const response = await firstValueFrom(this.httpService.get(url)); // Variable to retrive the data from the endpoint

            const apiHumidity = response.data.main?.humidity; // Passes the value of Humidity into the variable
            const locationName = response.data?.name; // Passes the value of name wiche in this case is the location name  exmple - (Curitiba) into the variable
            const userHumidityToNumber = Number(userHumidity); // The value inputed by the user is recived as a string and converted to a Number

             // This variable recives a method to calculate if the number imputed by the user is close to the one recived by the api
            const isCloseToActual = this.isClose(apiHumidity, userHumidityToNumber, 5);

            let humidityComparison: string; // this set the return desired on the body of the request

            // Checks if the Humidity informed matches the api is close our does not matches the recived one
            if (apiHumidity === userHumidityToNumber) {
                humidityComparison = `matched  the current humidty at  ${locationName}`;
            } else if (isCloseToActual) {
                humidityComparison = `close to the humidity at ${locationName}`;
            } else {
                humidityComparison =  `was not matched with the one at ${locationName}`;
            }


            // In here we are generating a new object of  HumidityToday using the class constructure
            const humidityResponse = new HumidityToday(
                humidityComparison,
                {humidity: apiHumidity},
                locationName,
                userHumidity
            );
              // Asingin the values of  humidityResponse into the toString method in HumidityToday class
            const contentReturn = humidityResponse.toString();

            // Example of tailored response in JSON - const contentReturn = humidityResponse.toJSON();

          /* Return the `contentReturn`, which contains a `toString` method. Remember, this can be changed to 
              return an object rather than a string. For the purpose of this application, a string was chosen. */
          return contentReturn ;
            

        } catch (err) { // error handller
            throw new HttpException('Failed to fetch weather data', HttpStatus.BAD_REQUEST);
        }
    }
}