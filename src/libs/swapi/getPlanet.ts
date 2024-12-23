import {fieldsPlanets, mapearCampoES} from "../../utils/attributesTranslate";
import {responseApi} from "../../utils/response";
import {PlanetSwapi} from "../../models/PlanetSwapi";
import axios from "axios";

export const getPlanetSwapi = async (language: string, paginator: number) => {
    try {
        const {data} = await axios.get(`https://swapi.py4e.com/api/planets?page=${paginator}`);
        const dataResponse: PlanetSwapi[] = data.results;
        if (dataResponse.length === 0) {
            return responseApi(data, "No hay datos registrados.", 404);
        }
        if (language === "es") {
            return dataResponse.map((person) => {
                return {
                    ...mapearCampoES(fieldsPlanets, person),
                };
            });
        }
        return dataResponse;
    } catch (error) {
        return responseApi(
            null,
            "Hubo un problema al listrar los planetas.",
            500,
            error
        );
    }
};
