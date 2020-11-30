package com.phoenixoft.teambalanceapp.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@ConfigurationProperties(prefix = "forgot-password")
@Component
@Data
public class ForgotPasswordProperties {

    private String url;
}
