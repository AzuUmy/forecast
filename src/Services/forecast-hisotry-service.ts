import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { weatherNow } from '../Interfaces/Forecast_interface';


// service to interact with the databasse extract the data and create ddata
@Injectable()
export class ForecastHistoryService {
  constructor(@InjectModel('ForecastHistory') private readonly forecastHistoryModel: Model<weatherNow>) {}

  // method to post data into the database
  async create(forecastHistoryDto: any): Promise<weatherNow> {
    const createdForecastHistory = new this.forecastHistoryModel(forecastHistoryDto);
    return createdForecastHistory.save();
  }

    async findByName(name: string): Promise<weatherNow[]> {
        return this.forecastHistoryModel.find({ 'info.name' :  {$regex: new RegExp(`^${name}$`, 'i')}}).exec(); // In this makes is possible to check boath lower case and upercase input
    }
}