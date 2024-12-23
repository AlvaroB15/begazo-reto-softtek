import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getPlanetSwapi } from "@libs/swapi/getPlanet";
const getPlanet = async (event) => {
    try {
        const response = await getPlanetSwapi(event.queryStringParameters.lan);
        return formatJSONResponse({
            message: "PlanetSwapi Found",
            data: response,
            status: 200
        });
    }
    catch (error) {
        return formatJSONResponse({
            error: error.message,
            status: 400
        });
    }
};
export const main = middyfy(getPlanet);
//# sourceMappingURL=handler.js.map
