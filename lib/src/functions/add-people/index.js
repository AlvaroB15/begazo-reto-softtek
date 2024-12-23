import { handlerPath } from "@libs/handler-resolver";
const handler = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "add-people",
    description: "Obtener los datos de las personas de la api swapi",
    events: [
        {
            http: {
                method: "post",
                path: "people"
            },
        },
    ],
};
export default handler;
//# sourceMappingURL=index.js.map