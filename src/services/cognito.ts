import {CognitoJwtVerifier} from "aws-jwt-verify";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Json, JsonObject} from "aws-jwt-verify/safe-json-parse";

interface AuthorizedEvent extends APIGatewayProxyEvent {
    user?: {
        email: null | string | number | boolean | Json[] | JsonObject;
        role: null | string | number | boolean | Json[] | JsonObject;
        sub: null | string | number | boolean | Json[] | JsonObject;
    };
}

export const authMiddleware = () => {
    return {
        before: async (handler: { event: AuthorizedEvent }) => {
            try {
                // Configurar el verificador de JWT
                const verifier = CognitoJwtVerifier.create({
                    userPoolId: process.env.USER_POOL_ID!,
                    tokenUse: "access",
                    clientId: process.env.USER_POOL_CLIENT_ID!
                });

                // Obtener el token del header
                const token = handler.event.headers.Authorization?.replace('Bearer ', '');

                if (!token) {
                    return formatJSONResponse(
                        {
                            message:  "No token provided",
                            status: 200
                        }
                    );
                }

                // Verificar el token
                const payload = await verifier.verify(token);

                // Agregar la información del usuario al evento
                handler.event.user = {
                    email: payload.email,
                    role: payload['custom:role'],
                    sub: payload.sub
                };

            } catch (error) {
                console.error('Auth Error:', error);
                throw {
                    statusCode: 401,
                    body: JSON.stringify({ message: 'Unauthorized' })
                };
            }
        }
    };
};

export const formatJSONResponse = (response: Record<string, unknown>, statusCode: number = 200) => {
    return {
        statusCode,
        body: JSON.stringify(response)
    };
};
