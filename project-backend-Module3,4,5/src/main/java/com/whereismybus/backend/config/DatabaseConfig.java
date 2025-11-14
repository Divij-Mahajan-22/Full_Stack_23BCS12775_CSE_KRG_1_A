package com.whereismybus.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.whereismybus.backend.repositories")
@EnableJpaAuditing
@EnableTransactionManagement
public class DatabaseConfig {
    // Additional database configuration if needed
}
