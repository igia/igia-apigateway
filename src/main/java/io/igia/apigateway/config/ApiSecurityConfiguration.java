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

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.util.matcher.RequestHeaderRequestMatcher;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@Configuration
@EnableResourceServer
@Import(SecurityProblemSupport.class)
public class ApiSecurityConfiguration extends ResourceServerConfigurerAdapter {

    private final SecurityProblemSupport problemSupport;

    public ApiSecurityConfiguration(SecurityProblemSupport problemSupport) {
        this.problemSupport = problemSupport;
    }
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
			// only enable when there is Authorization header
			.requestMatcher(new RequestHeaderRequestMatcher("Authorization"))
			.csrf().disable()
            .exceptionHandling()
            .authenticationEntryPoint(problemSupport)
            .accessDeniedHandler(problemSupport)
        .and()
			.authorizeRequests()
			// only allow access if the URL is /servicename/api/**
			// the downstream resource server should do the real authorization checking
			.antMatchers("/?*/api/**").authenticated()
			// deny access using this security chain if the URL is not /servicename/api/**
			.antMatchers("/**").denyAll();
	}
}
