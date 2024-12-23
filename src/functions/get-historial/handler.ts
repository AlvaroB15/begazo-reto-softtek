import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import {getHistorialService} from "../../services/planets";

const getHistorial: Handler = async (event: APIGatewayEvent) => {
    try {
        const page = event.queryStringParameters?.page || "1";
        const order = event.queryStringParameters?.order || "desc";
        const limit = 10; // Items por página
        const nextTokenParam = event.queryStringParameters?.nextToken || null;
        if(Number(page) > 1 && !nextTokenParam){
            return formatJSONResponse(
                {
                    message:  "nextToken is required, this field is in the response",
                    status: 500
                }
            );
        }
        if( Number(page) > 9) {
            return formatJSONResponse(
                {
                    message:  "It does not have page greater than 9",
                    status: 404
                }
            );
        }
        const historial: any = await getHistorialService(page, order, limit, nextTokenParam);
        return formatJSONResponse(
            {
                message: "Historial list Found",
                data: historial,
                status: 200
            }
        );
    } catch (error) {
        return formatJSONResponse(
            {
                error: error.message,
                status: 400
            }
        );
    }
};

export const main = middyfy(getHistorial);
