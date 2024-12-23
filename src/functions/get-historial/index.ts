import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "get-historial",
    description: "Retorna el historial de todas las respuestas almacenadas por el endpoint /fusionados",
    events: [
        {
            http: {
                method: "get",
                path: "historial"
            },
        },
    ],
};
export default handler;
