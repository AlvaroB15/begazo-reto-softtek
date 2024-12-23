import { handlerPath } from "@libs/handler-resolver";
const handler = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "get-people",
    description: "Obtener los datos de la tabla de Dynamo",
    events: [
        {
            http: {
                method: "get",
                path: "people"
            },
        },
    ],
};
export default handler;
//# sourceMappingURL=index.js.map