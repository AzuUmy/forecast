import { Info } from "src/Interfaces/Forecast_interface";
import { ForecastIntelResponse } from "src/Interfaces/Intel-forecast-object";

//  A model that implement the intel interface 
export class ForecastIntelSense implements ForecastIntelResponse {
    avgHumidity: number;
    avgTemp: number;
    Info: Info;

    constructor(avgHumidity: number, avgTemp: number, Info:Info){
        this.avgHumidity = avgHumidity;
        this.avgTemp = avgTemp;
        this.Info = Info;
    } // consstructor for the  ForecastIntelSense


    /*
        To string method to define a tailored response for 
        the porpouse of this project the reponse of this type of 
        data does not need to be an object JSON, XML etc...  
        As the point of this aplication is to just delivery a simple response
    */ 
    toString(): string {
        return `The average registered Tempature in ${this.Info.name} are ${this.avgTemp}%
        and the average registered Humidity  is  ${this.avgHumidity}%
        `
    }

}