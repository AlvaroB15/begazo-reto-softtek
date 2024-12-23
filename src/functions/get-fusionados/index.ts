import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "get-merged-data",
	description: "Obtener los datos de los planetas de la api swapi fusionada con la de OpenWeatherMap",
	events: [
		{
			http: {
				method: "get",
				path: "fusionados",
				// authorizer: {
				// 	name: 'cognitoAuthorizer',
				// 	type: 'COGNITO_USER_POOLS',
				// 	arn: { 'Fn::GetAtt': ['UserPool', 'Arn'] }
				// }
			},
		},
	],
	environment:{
		WEATHER_API_KEY: '${ssm:/RETO_SOFTTEK/DEV/WEATHER_API_KEY}',
		// USER_POOL_ID: { Ref: 'UserPool' },
		// USER_POOL_CLIENT_ID: { Ref: 'UserPoolClient' }
		// DATABASE_CACHE: '${ssm:/RETO_SOFTTEK/DEV/WEATHER_API_KEY}'
	},

};
export default handler;
