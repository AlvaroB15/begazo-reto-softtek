import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getPersonService } from "../../services/people";
const getPerson = async (event) => {
    try {
        const result = await getPersonService(event.queryStringParameters.id);
        return formatJSONResponse({
            message: "Person found.",
            data: result.Item,
            status: 200
        });
    }
    catch (error) {
        console.log({ error_addPeople: error });
        return formatJSONResponse({
            error: error.message,
            message: "Couldn't find person details",
            status: 500
        });
    }
};
export const main = middyfy(getPerson);
//# sourceMappingURL=handler.js.map