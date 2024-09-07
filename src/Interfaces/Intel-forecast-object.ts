import { Info } from "./Forecast_interface";
// Interface for the intelingece response - return the location and the average of Temperature and Humidity
export interface ForecastIntelResponse {
    avgHumidity: number; // average Humidity
    avgTemp: number; // average Tempo 
    Info: Info; // variable expect an object type info so is possible to stract the name from the info object
}