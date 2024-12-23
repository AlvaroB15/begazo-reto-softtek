import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "add-data-custom",
    description: "Registrar información personalizada (no relacionada con las APIs externas) en la base de datos.",
    events: [
        {
            http: {
                method: "post",
                path: "almacenar"
            },
        },
    ],
};
export default handler;
