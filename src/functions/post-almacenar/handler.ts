import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import {addDataCustomService} from "../../services/custom";

const addDataCustom: Handler = async (event: APIGatewayEvent) => {
    try {
        const createdAt = new Date();
        const id = v4();
        const newData = {
            id,
            ...JSON.parse(JSON.stringify(event.body)),
            fechaRegistro: createdAt.toString(),
        };
        await addDataCustomService(newData);
        return formatJSONResponse(
            {
                message: "Data custom registered",
                data: newData,
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

export const main = middyfy(addDataCustom);
