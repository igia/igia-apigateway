/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v.
 * 2.0 with a Healthcare Disclaimer.
 * A copy of the Mozilla Public License, v. 2.0 with the Healthcare Disclaimer can
 * be found under the top level directory, named LICENSE.
 * If a copy of the MPL was not distributed with this file, You can obtain one at
 * http://mozilla.org/MPL/2.0/.
 * If a copy of the Healthcare Disclaimer was not distributed with this file, You
 * can obtain one at the project website https://github.com/igia.
 *
 * Copyright (C) 2018-2019 Persistent Systems, Inc.
 */
package io.igia.apigateway.config;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.OncePerRequestFilter;

import io.igia.apigateway.security.OAuth2AuthenticationSuccessHandler;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Development only configuration that is Browsersync-aware and redirects to the origin you clicked "login" from.
 * If you split your application into client and server on separate domains, you might want to enable this for prod
 * mode too.
 */
@Configuration
@Profile("dev")
public class OAuth2Configuration {
    public static final String SAVED_LOGIN_ORIGIN_URI = OAuth2Configuration.class.getName() + "_SAVED_ORIGIN";

    private final Logger log = LoggerFactory.getLogger(OAuth2Configuration.class);

    @Bean
    public FilterRegistrationBean<OncePerRequestFilter> saveLoginOriginFilter() {
        OncePerRequestFilter filter = new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain filterChain)
                throws ServletException, IOException {
                if (request.getRemoteUser() == null && request.getRequestURI().endsWith("/login")) {
                    String referrer = request.getHeader("referer");
                    if (!StringUtils.isBlank(referrer) &&
                        request.getSession().getAttribute(SAVED_LOGIN_ORIGIN_URI) == null) {
                        log.debug("Saving login origin URI: {}", referrer);
                        request.getSession().setAttribute(SAVED_LOGIN_ORIGIN_URI, referrer);
                    }
                }
                filterChain.doFilter(request, response);
            }
        };
        FilterRegistrationBean<OncePerRequestFilter> bean = new FilterRegistrationBean<>(filter);
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

    @Bean
    public static DefaultRolesPrefixPostProcessor defaultRolesPrefixPostProcessor() {
        return new DefaultRolesPrefixPostProcessor();
    }

    public static class DefaultRolesPrefixPostProcessor implements BeanPostProcessor, PriorityOrdered {

        @Override
        public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
            if (bean instanceof FilterChainProxy) {

                FilterChainProxy chains = (FilterChainProxy) bean;

                for (SecurityFilterChain chain : chains.getFilterChains()) {
                    for (Filter filter : chain.getFilters()) {
                        if (filter instanceof OAuth2ClientAuthenticationProcessingFilter) {
                            OAuth2ClientAuthenticationProcessingFilter oAuth2ClientAuthenticationProcessingFilter =
                                (OAuth2ClientAuthenticationProcessingFilter) filter;
                            oAuth2ClientAuthenticationProcessingFilter
                                .setAuthenticationSuccessHandler(new OAuth2AuthenticationSuccessHandler());
                        }
                    }
                }
            }
            return bean;
        }

        @Override
        public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
            return bean;
        }

        @Override
        public int getOrder() {
            return PriorityOrdered.HIGHEST_PRECEDENCE;
        }
    }
}
