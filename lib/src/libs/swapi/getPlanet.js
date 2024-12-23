import { mapearCampoES, fieldsPlanets } from "../../utils/attributesTranslate";
import { responseApi } from "../../utils/response";
import axios from "axios";
export const getPlanetSwapi = async (language = "en") => {
    try {
        const { data } = await axios.get("https://swapi.py4e.com/api/planets/");
        const dataResponse = data.results;
        if (dataResponse.length === 0) {
            return responseApi(data, "No hay datos registrados.", 404);
        }
        if (language === "es") {
            const datResponseConverted = dataResponse.map((person) => {
                return {
                    ...mapearCampoES(fieldsPlanets, person),
                };
            });
            return responseApi(datResponseConverted, "Lista de planetas obtenida correctamente.", 200);
        }
        return responseApi(dataResponse, "Lista de planetas obtenida correctamente.", 200);
    }
    catch (error) {
        console.log({ error: error });
        return responseApi(null, "Hubo un problema al listrar los planetas.", 500, error);
    }
};
//# sourceMappingURL=getPlanet.js.map