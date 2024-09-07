import { Cord, Weather, Main, Wind, Info, weatherNow } from "src/Interfaces/Forecast_interface";

//t This class implmenetsthe  interface of  weatherNow
export class ForecastToday implements weatherNow {
    cord: Cord;
    weather: Weather[];
    main: Main;
    wind: Wind;
    info: Info;

    // Constructor for the  ForecastToday class
    constructor(cord: Cord, weather: Weather[], main: Main, wind: Wind, info: Info) {
        this.cord = cord;
        this.weather = weather;
        this.main = main;
        this.wind = wind;
        this.info = info;
    }

    
    /* This is an example of using a JSON format to structure the data in the desired 
    format. For the purposes of this application, I will not be using this method as 
    I want to return a custom message for the response. */

    toJSON(): object {
        return {
            cord: this.cord,
            weather: this.weather,
            main: this.main,
            wind: this.wind,
            info: this.info
        };
    }
}