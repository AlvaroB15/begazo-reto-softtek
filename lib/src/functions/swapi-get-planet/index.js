import { handlerPath } from "@libs/handler-resolver";
const handler = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "get-planet-swapi",
    description: "Obtener los datos de los planetas de la api swapi",
    events: [
        {
            http: {
                method: "get",
                path: "swapi/planet"
            },
        },
    ],
};
export default handler;
//# sourceMappingURL=index.js.map