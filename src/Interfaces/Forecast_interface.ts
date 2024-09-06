
// Interface geolocation 
interface Cord {
    lon:  number;
    lat: number;
}

// Interface for basic weather info
interface Weather{
    main: String;
    description: String;
    icon: string;
}

//Interface to return theimportant wheter info
interface Main {
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
interface Wind{
    speed: number;
    deg: number;
}

// interface for Info
interface Info{
    country: String;
    timeZone: String;
    name: String;
}

// this interface can be used to retrive more info if needed
export interface weatherNow{
    cord: Cord;
    weather:  Weather[];
    main:  Main;
    wind: Wind;
    info: Info;
}

//Interface to return a custom body in the request
export interface HumidityResponse{
    comparison: string;
    humidityInfo: {
        feedback: string,
    }
}


