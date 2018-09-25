package com.reda.reda.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.reda.reda.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.reda.reda.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Student.class.getName() + ".cohorts", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Student.class.getName() + ".studentOffers", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.ContactInformation.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.ContactInformation.class.getName() + ".entreprises", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Country.class.getName() + ".provinces", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Province.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Entreprise.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Entreprise.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Employee.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Teacher.class.getName() + ".cohorts", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Cohort.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Offer.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Offer.class.getName() + ".studentOffers", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.StudentOffer.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.StudentOffer.class.getName() + ".interviews", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Interview.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Interview.class.getName() + ".internships", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Internship.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Internship.class.getName() + ".documents", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Document.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.DocumentType.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.DocumentType.class.getName() + ".documents", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Technology.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.Technology.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.OfferType.class.getName(), jcacheConfiguration);
            cm.createCache(com.reda.reda.domain.OfferType.class.getName() + ".offers", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
