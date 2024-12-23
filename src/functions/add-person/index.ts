import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
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
