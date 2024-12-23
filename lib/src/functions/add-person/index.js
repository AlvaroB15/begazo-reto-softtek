import { handlerPath } from "@libs/handler-resolver";
const handler = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "add-person",
    description: "Obtener los datos de las personas de la tabla de Dynamo",
    events: [
        {
            http: {
                method: "post",
                path: "person"
            },
        },
    ],
};
export default handler;
//# sourceMappingURL=index.js.map