import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getPlanetSwapi } from "@libs/swapi/getPlanet";
import {savePlanet} from "../../services/planets";
import {getWeatherByLocation} from "@libs/openweathermap/weatherByLocation";
import { v4 } from "uuid";
import {Planet} from "../../models/Planet";
import {getDataFusionadosCache, saveDataCache} from "../../services/cache";

const getMergedData: Handler = async (event: APIGatewayEvent) => {
    try {
        const language = event.queryStringParameters?.lan || 'en';
        const paginator = Number(event.queryStringParameters?.pag) || 1;
        const CACHE_TTL = 30 * 60;
        const partitionKeyCache = `dataFusionados${paginator}`;
        if( paginator > 9) {
            return formatJSONResponse(
                {
                    message:  "It does not have pagination greater than 9",
                    status: 404
                }
            );
        }
        // Verifica si existe data guardada de la consutla previa u si no se ha eliminado por su tiempo de expiracion
        const dataCache = await getDataFusionadosCache(partitionKeyCache);
        if(dataCache.Item){
            return formatJSONResponse(
                {
                    message: "Planets list Found WITH Cache",
                    data: dataCache.Item,
                    status: 200
                }
            );
        }
        const planets: any = await getPlanetSwapi(language, paginator);
        // Para cada planeta, obtener datos del clima
        const fusedData = await Promise.all(
            planets.map(async (planet:any) => {
                const long = Math.floor(Math.random() * 51);
                const lat = Math.floor(Math.random() * 51);
                const weather = await getWeatherByLocation(lat, long);
                const fusedItem: Planet = {
                    type: 'planet',
                    id: v4(),
                    planetInfo: planet,
                    weatherInfo: weather,
                    createdAt: new Date().toISOString()
                };
                await savePlanet(fusedItem);
                return fusedItem;
            })
        );
        const now = Math.floor(Date.now() / 1000);
        if(!dataCache.Item){
            await saveDataCache({
                id: partitionKeyCache,
                createdAt: now,
                expiresAt: now + CACHE_TTL,
                fusedData
            });
        }
        return formatJSONResponse(
            {
                message: "Planets list Found WITHOUT Cache",
                data: fusedData,
                status: 200
            }
        );
    } catch (error) {
        return formatJSONResponse(
            {
                error: error.message,
                status: 500
            }
        );
    }
};

export const main = middyfy(getMergedData)
    // .use(authMiddleware());
