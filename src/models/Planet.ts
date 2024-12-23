import {WeatherData} from "./Weather";

export interface Planet{
    type: string;
    id: string;
    planetInfo: Planet;
    weatherInfo: WeatherData;
    createdAt: string;
}
