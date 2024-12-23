import {APIGatewayEvent, Handler} from "aws-lambda";
import {formatJSONResponse} from "@libs/api-gateway";
import {middyfy} from "@libs/lambda";
import {getPersonService} from "../../services/people";
import {verifyIfContainsData} from "../../utils/common";

const getPerson: Handler = async (event: APIGatewayEvent) => {
    try {
        const result = await getPersonService(event.queryStringParameters.id);
        if (!result.Item) return verifyIfContainsData(result, 'person');
        return formatJSONResponse(
            {
                message: "Person found.",
                data: result.Item,
                status: 200
            }
        );
    } catch (error) {
        console.log({error_addPeople: error});
        return formatJSONResponse(
            {
                error: error.message,
                message: "Error while retrieving person details",
                status: 500
            }
        );
    }
};

export const main = middyfy(getPerson);
