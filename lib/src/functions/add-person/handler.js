import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import { addPersonService } from "../../services/people";
const addPerson = async (event) => {
    try {
        const { nombre, genero, planetaOrigen } = JSON.parse(JSON.stringify(event.body));
        const createdAt = new Date();
        const id = v4();
        const newPerson = {
            id,
            nombre,
            genero,
            planetaOrigen,
            fechaRegistro: createdAt.toString(),
        };
        await addPersonService(newPerson);
        return formatJSONResponse({
            message: "People registered",
            data: newPerson,
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
export const main = middyfy(addPerson);
//# sourceMappingURL=handler.js.map