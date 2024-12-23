import { handlerPath } from "@libs/handler-resolver";
const handler = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    package: {
        patterns: [`${handlerPath(__dirname)}/handler.js`]
    },
    name: "get-people-swapi",
    description: "Obtener los datos de las personas de la api swapi",
    events: [
        {
            http: {
                method: "get",
                path: "swapi/people"
            },
        },
    ],
};
export default handler;
//# sourceMappingURL=index.js.map