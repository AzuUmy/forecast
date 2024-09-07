import { HumidityResponse } from "src/Interfaces/Forecast_interface";

// This class implmenetsthe  interface of  HumidityResponse
export class HumidityToday implements  HumidityResponse {
    comparison: string;
    main: { humidity: number; };
    imputedHumidity: number;
    locationName: string;

// Constructor for the  HumidityToday class
    constructor(comparison: string, main: { humidity: number }, 
        locationName: string, imputedHumidity: number) {
                this.comparison = comparison;
                this.main = main;
                this.locationName = locationName;
                this.imputedHumidity = imputedHumidity;
    }


/* For the purpose of this application, the `toString` method was chosen to craft a 
tailored custom message. In an ideal scenario where data is expected in an object type, 
this approach is not ideal! It is better to return an object type. 
If the goal is to tailor the response, a JSON response type can be used, or you can return 
the `HumidityToday` class, which is an object but tailored within the class structure, rather than using a less structured format. */
    toString() : string{
        return ` The Humidity imputed by the user  ${this.comparison},
             Humidity at ${this.locationName} at the moment is.  ${this.main.humidity}%
             The user's input was: ${this.imputedHumidity}%
        `
    }
}