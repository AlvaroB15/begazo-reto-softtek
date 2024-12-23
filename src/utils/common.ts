import {formatJSONResponse} from "@libs/api-gateway";

export const verifyIfContainsData = (result: any, stringEntity: string) => {
    if (!result.Item) {
        return formatJSONResponse({
            message: `Couldn't find ${stringEntity} details`,
            status: 404
        });
    }
}

export const dataConstants = {
    nameDynamo: 'People',
    planetsDynamo: 'Planets',
    customDynamo: 'Custom',
    cacheDynamo: 'DataCache',
    region: 'us-east-1'
}
