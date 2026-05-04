package com.dmgdev.pokehub.map.city.data;

import com.dmgdev.pokehub.map.city.dto.CityMarkerResponse;

import java.util.List;

public final class SpanishCityCatalog {

    private SpanishCityCatalog() {
    }

    public static List<CityMarkerResponse> getCities() {
        return List.of(
                // Galicia / Norte húmedo
                new CityMarkerResponse("A Coruña", "España", 43.3623, -8.4115, "north"),
                new CityMarkerResponse("Lugo", "España", 43.0097, -7.5568, "north"),
                new CityMarkerResponse("Ourense", "España", 42.3358, -7.8639, "north"),
                new CityMarkerResponse("Pontevedra", "España", 42.4310, -8.6444, "north"),
                new CityMarkerResponse("Vigo", "España", 42.2406, -8.7207, "coast"),

                // Asturias / Cantabria / País Vasco
                new CityMarkerResponse("Oviedo", "España", 43.3619, -5.8494, "north"),
                new CityMarkerResponse("Gijón", "España", 43.5322, -5.6611, "coast"),
                new CityMarkerResponse("Santander", "España", 43.4623, -3.8099, "coast"),
                new CityMarkerResponse("Bilbao", "España", 43.2630, -2.9350, "north"),
                new CityMarkerResponse("San Sebastián", "España", 43.3183, -1.9812, "coast"),
                new CityMarkerResponse("Vitoria-Gasteiz", "España", 42.8467, -2.6716, "north"),

                // Navarra / La Rioja / Aragón
                new CityMarkerResponse("Pamplona", "España", 42.8125, -1.6458, "north"),
                new CityMarkerResponse("Logroño", "España", 42.4627, -2.4449, "inland"),
                new CityMarkerResponse("Huesca", "España", 42.1401, -0.4089, "mountain"),
                new CityMarkerResponse("Zaragoza", "España", 41.6488, -0.8891, "inland"),
                new CityMarkerResponse("Teruel", "España", 40.3440, -1.1065, "mountain"),

                // Cataluña
                new CityMarkerResponse("Barcelona", "España", 41.3874, 2.1686, "coast"),
                new CityMarkerResponse("Girona", "España", 41.9794, 2.8214, "coast"),
                new CityMarkerResponse("Lleida", "España", 41.6176, 0.6200, "inland"),
                new CityMarkerResponse("Tarragona", "España", 41.1189, 1.2445, "coast"),
                new CityMarkerResponse("Sabadell", "España", 41.5463, 2.1086, "urban"),
                new CityMarkerResponse("Terrassa", "España", 41.5632, 2.0089, "urban"),
                new CityMarkerResponse("Badalona", "España", 41.4500, 2.2474, "coast"),

                // Castilla y León
                new CityMarkerResponse("Ávila", "España", 40.6565, -4.6818, "mountain"),
                new CityMarkerResponse("Burgos", "España", 42.3439, -3.6969, "inland"),
                new CityMarkerResponse("León", "España", 42.5987, -5.5671, "mountain"),
                new CityMarkerResponse("Palencia", "España", 42.0095, -4.5288, "inland"),
                new CityMarkerResponse("Salamanca", "España", 40.9701, -5.6635, "inland"),
                new CityMarkerResponse("Segovia", "España", 40.9429, -4.1088, "mountain"),
                new CityMarkerResponse("Soria", "España", 41.7636, -2.4649, "mountain"),
                new CityMarkerResponse("Valladolid", "España", 41.6523, -4.7245, "inland"),
                new CityMarkerResponse("Zamora", "España", 41.5035, -5.7446, "inland"),

                // Comunidad de Madrid
                new CityMarkerResponse("Madrid", "España", 40.4168, -3.7038, "urban"),
                new CityMarkerResponse("Alcalá de Henares", "España", 40.4819, -3.3635, "urban"),
                new CityMarkerResponse("Móstoles", "España", 40.3223, -3.8649, "urban"),
                new CityMarkerResponse("Fuenlabrada", "España", 40.2902, -3.8035, "urban"),
                new CityMarkerResponse("Leganés", "España", 40.3319, -3.7687, "urban"),
                new CityMarkerResponse("Getafe", "España", 40.3083, -3.7328, "urban"),
                new CityMarkerResponse("Alcorcón", "España", 40.3468, -3.8278, "urban"),

                // Castilla-La Mancha
                new CityMarkerResponse("Albacete", "España", 38.9943, -1.8585, "inland"),
                new CityMarkerResponse("Ciudad Real", "España", 38.9861, -3.9273, "inland"),
                new CityMarkerResponse("Cuenca", "España", 40.0704, -2.1374, "mountain"),
                new CityMarkerResponse("Guadalajara", "España", 40.6325, -3.1602, "inland"),
                new CityMarkerResponse("Toledo", "España", 39.8628, -4.0273, "inland"),

                // Comunidad Valenciana
                new CityMarkerResponse("Alicante", "España", 38.3452, -0.4810, "coast"),
                new CityMarkerResponse("Castellón de la Plana", "España", 39.9864, -0.0513, "coast"),
                new CityMarkerResponse("Valencia", "España", 39.4699, -0.3763, "coast"),
                new CityMarkerResponse("Elche", "España", 38.2699, -0.7126, "coast"),

                // Región de Murcia
                new CityMarkerResponse("Murcia", "España", 37.9922, -1.1307, "south"),
                new CityMarkerResponse("Cartagena", "España", 37.6257, -0.9966, "coast"),

                // Extremadura
                new CityMarkerResponse("Badajoz", "España", 38.8794, -6.9707, "inland"),
                new CityMarkerResponse("Cáceres", "España", 39.4753, -6.3724, "inland"),

                // Andalucía
                new CityMarkerResponse("Almería", "España", 36.8340, -2.4637, "coast"),
                new CityMarkerResponse("Cádiz", "España", 36.5271, -6.2886, "coast"),
                new CityMarkerResponse("Córdoba", "España", 37.8882, -4.7794, "south"),
                new CityMarkerResponse("Granada", "España", 37.1773, -3.5986, "mountain"),
                new CityMarkerResponse("Huelva", "España", 37.2614, -6.9447, "coast"),
                new CityMarkerResponse("Jaén", "España", 37.7796, -3.7849, "mountain"),
                new CityMarkerResponse("Málaga", "España", 36.7213, -4.4214, "coast"),
                new CityMarkerResponse("Sevilla", "España", 37.3891, -5.9845, "south"),
                new CityMarkerResponse("Jerez de la Frontera", "España", 36.6850, -6.1261, "south"),
                new CityMarkerResponse("Marbella", "España", 36.5101, -4.8824, "coast"),
                new CityMarkerResponse("Dos Hermanas", "España", 37.2866, -5.9242, "south"),

                // Baleares
                new CityMarkerResponse("Palma", "España", 39.5696, 2.6502, "island"),

                // Canarias
                new CityMarkerResponse("Las Palmas de Gran Canaria", "España", 28.1235, -15.4363, "island"),
                new CityMarkerResponse("Santa Cruz de Tenerife", "España", 28.4636, -16.2518, "island"),

                // Ciudades autónomas
                new CityMarkerResponse("Ceuta", "España", 35.8894, -5.3213, "coast"),
                new CityMarkerResponse("Melilla", "España", 35.2923, -2.9381, "coast")
        );
    }
}