package com.dmgdev.pokehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PokehubBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PokehubBackendApplication.class, args);
    }
}