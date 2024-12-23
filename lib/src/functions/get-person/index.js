import { handlerPath } from "@libs/handler-resolver";
const handler = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "get-person",
    description: "Obtener datos de una persona especifica de Dynamo",
    events: [
        {
            http: {
                method: "get",
                path: "person"
            },
        },
    ],
};
export default handler;
//# sourceMappingURL=index.js.map