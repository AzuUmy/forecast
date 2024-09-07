import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import {ForecastToday } from"../Model/Forecast_today_model"
import { ForecastHistoryService } from 'src/Services/forecast-hisotry-service';
import { Cord, Info, Main, Weather, weatherNow, Wind } from "src/Interfaces/Forecast_interface";
import {ForecastIntelResponse } from '../Interfaces/Intel-forecast-object';
import { ForecastIntelSense } from "src/Model/Forecat_intel_model";


/* Forecast inteligence service - at the moment only 
the average of temperature and humidity are been calculate but more can be implemented*/
@Injectable()
export class ForecastInteligence{

    constructor(private readonly forecastHistoryService: ForecastHistoryService) {} 

/* method to calculate the average of temperature and humidity */
    private intelDataSense(humidityValues: number[], tempValues: number[]): { avgHumidity: number, avgTemp: number } {
        const totalHumidity = humidityValues.reduce((sum, current) => sum + current, 0);
        const totalTemp = tempValues.reduce((sum, current) => sum + current, 0);
        const avgHumidity = totalHumidity / humidityValues.length;
        const avgTemp = totalTemp / tempValues.length;
        return { avgHumidity, avgTemp };
    }

    async findIntelData(stateName: string): Promise<string>{
            try {

                const historicalData: weatherNow[] = await this.forecastHistoryService.findByName(stateName);

                if(historicalData.length === 0) {
                    return "No data found for the imputed state name ";
                }
           
                //extracts desired ddata from historicalData
            const humidity = historicalData.map(data => data.main.humidity);
            const temperature = historicalData.map(data => data.main.temp);
            const location = historicalData[0].info;
            const { avgHumidity, avgTemp } = this.intelDataSense(humidity, temperature);

            // Create an instance of ForecastIntelSense
            const intelSense = new ForecastIntelSense(avgHumidity, avgTemp, location);

                // Rerturn a toString response 
            return intelSense.toString();

            } catch(err){// error handling
                    throw new HttpException('Failed to retrieve weather intelligence data', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }
