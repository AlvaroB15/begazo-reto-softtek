import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getPeopleSwapi } from "@libs/swapi/getPeople";
const getPeople = async (event) => {
    try {
        const response = await getPeopleSwapi(event.queryStringParameters.lan);
        return formatJSONResponse({
            message: "People Found",
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
export const main = middyfy(getPeople);
//# sourceMappingURL=handler.js.map