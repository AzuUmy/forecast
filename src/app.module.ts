import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { forecastHumitityController } from './Controllers/Forecast-humitity-controller';
import { ForecastServiceHumidity } from './Services/Forecast_service_humidity';
import { HttpModule } from '@nestjs/axios';
import { forecastWeatherTodayController } from './Controllers/Forecast-today-controller';
import { ForecastWeatherNowService } from './Services/Forecast_service_Weather_now';
import { ForecastHistorySchema } from './Database/Schema/Forecast_History';
import { ForecastHistoryService } from './Services/forecast-hisotry-service';
import { ForecastHistoryController } from './Database/Controller/Todays-forecast-d-controller';
import {forecastInteligenceData} from './Controllers/Forecast-intel-sense';
import { ForecastInteligence } from './Services/Forecast_intel.service';


// Module to interact with the controllers and services avaible
@Module({
  imports: [HttpModule,
     MongooseModule.forRoot('mongodb://mongo-db:27017/nest'), // Imports mongose module for mongoDb connection
     MongooseModule.forFeature([{ name: 'ForecastHistory', schema: ForecastHistorySchema }]),
  ],
  controllers: [
          forecastHumitityController,
          forecastWeatherTodayController,
          ForecastHistoryController,
          forecastInteligenceData
        ],

  providers: [
            ForecastServiceHumidity,
            ForecastWeatherNowService,
            ForecastHistoryService,
            ForecastInteligence],
})

export class AppModule {}
