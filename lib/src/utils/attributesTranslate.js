export const fieldsPeople = {
    name: "nombre",
    height: "altura",
    mass: "peso",
    hair_color: "colorCabello",
    skin_color: "tes",
    eye_color: "colorOjos",
    birth_year: "anioNacimiento",
    gender: "genero",
    homeworld: "planetaOrigen",
    films: "peliculas",
    species: "especies",
    vehicles: "vehiculos",
    starships: "navesEstelares",
    created: "fechaRegistro",
    edited: "fechaEdicion",
    url: "url",
};
export const fieldsPlanets = {
    climate: "clima",
    created: "fechaRegistro",
    diameter: "diametro",
    edited: "fechaEdicion",
    films: "peliculas",
    gravity: "gravedad",
    name: "nombre",
    orbital_period: "periodoOrbital",
    population: "poblacion",
    residents: "residentes",
    rotation_period: "periodoRotacion",
    surface_water: "superficieAgua",
    terrain: "terreno",
    url: "url",
};
export const mapearCampoES = (camposEntidad, instancia) => {
    return Object.keys(instancia).reduce((objeto, atributo) => {
        const campoTraducido = camposEntidad[atributo];
        objeto[campoTraducido] = instancia[atributo];
        return objeto;
    }, {});
};
//# sourceMappingURL=attributesTranslate.js.map