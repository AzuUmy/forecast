import { Module } from '@nestjs/common';
import { forecastController } from './Controllers/Forecast-controller';
import { ForecastService } from './Services/Forecast_service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [forecastController],
  providers: [ForecastService],
})
export class AppModule {}
