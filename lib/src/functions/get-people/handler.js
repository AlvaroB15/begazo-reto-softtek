import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getPeopleService } from "../../services/people";
const getPeople = async () => {
    try {
        const result = await getPeopleService();
        return formatJSONResponse({
            message: "People list Found",
            data: result.Items,
            status: 200
        });
    }
    catch (error) {
        console.log({ error_addPeople: error });
        return formatJSONResponse({
            error: error.message,
            status: 500
        });
    }
};
export const main = middyfy(getPeople);
//# sourceMappingURL=handler.js.map