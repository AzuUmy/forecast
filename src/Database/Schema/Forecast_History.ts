import { Schema } from 'mongoose';

//  Define schemas for database persistence - nested schemas
const CordSchema = new Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

const WeatherSchema = new Schema({
  id: { type: Number, required: true },
  main: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

const MainSchema = new Schema({
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  temp_min: { type: Number, required: true },
  temp_max: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
  sea_level: { type: Number },
  grnd_level: { type: Number },
});

const WindSchema = new Schema({
  speed: { type: Number, required: true },
  deg: { type: Number, required: true },
});

const InfoSchema = new Schema({
  country: { type: String, required: true },
  timeZone: { type: Number, required: true },
  name: { type: String, required: true },  
});

// Database persited data schema
export const ForecastHistorySchema = new Schema({
  cord: { type: CordSchema, required: true },
  weather: [WeatherSchema],
  main: { type: MainSchema, required: true },
  wind: { type: WindSchema, required: true },
  info: { type: InfoSchema, required: true },
});