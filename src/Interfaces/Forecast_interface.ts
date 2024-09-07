
// Interface geolocation 
export interface Cord {
    lon:  number;
    lat: number;
}

// Interface for basic weather info
export interface Weather{
    main: String;
    description: String;
    icon: string;
}

// Interface to return theimportant wheter info
export interface Main {
    temp: number;
    feels_like: number;
    min: number;
    max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; 
    grnd_level?: number; 
}

// Interface or wind based data
export interface Wind{
    speed: number;
    deg: number;
}

// Interface for Info
export interface Info{
    country: String;
    timeZone: String;
    name: String;
}

// This interface can be used to retrive more info if needed
export interface weatherNow{
    cord: Cord;
    weather:  Weather[];
    main:  Main;
    wind: Wind;
    info: Info;
}

// Interface to return a custom body in the request
export interface HumidityResponse{
    comparison: string;
    main: {
        humidity: number,
    }
}


