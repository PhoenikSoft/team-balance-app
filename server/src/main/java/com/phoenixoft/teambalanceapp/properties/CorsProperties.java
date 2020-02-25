package com.phoenixoft.teambalanceapp.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@ConfigurationProperties(prefix = "cors")
@Component
@Data
public class CorsProperties {

    private List<String> origins;
}
