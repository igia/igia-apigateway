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
package io.igia.apigateway.web.rest;

import org.apache.commons.lang3.RandomStringUtils;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashSet;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import io.igia.apigateway.ApigtwApp;
import io.igia.apigateway.domain.Authority;
import io.igia.apigateway.domain.User;
import io.igia.apigateway.repository.UserRepository;
import io.igia.apigateway.security.AuthoritiesConstants;
import io.igia.apigateway.service.UserService;
import io.igia.apigateway.web.rest.AccountResource;
import io.igia.apigateway.web.rest.errors.ExceptionTranslator;

/**
 * Test class for the AccountResource REST controller.
 *
 * @see AccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ApigtwApp.class)
public class AccountResourceIntTest{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private UserService userService;

    private MockMvc restUserMockMvc;

    @Autowired
    private WebApplicationContext context;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AccountResource accountUserMockResource = new AccountResource(userService);

        this.restUserMockMvc = MockMvcBuilders.standaloneSetup(accountUserMockResource)
            .setControllerAdvice(exceptionTranslator)
            .build();
    }

    @Test
    public void testNonAuthenticatedUser() throws Exception {
        restUserMockMvc.perform(get("/api/authenticate")
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().string(""));
    }

    @Test
    public void testAuthenticatedUser() throws Exception {
        restUserMockMvc.perform(get("/api/authenticate")
            .with(request -> {
                request.setRemoteUser("test");
                return request;
            })
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().string("test"));
    }

    @Test
    @Transactional
    public void testGetExistingAccount() throws Exception {
        Set<Authority> authorities = new HashSet<>();
        Authority authority = new Authority();
        authority.setName(AuthoritiesConstants.ADMIN);
        authorities.add(authority);

        User user = new User();
        user.setId(RandomStringUtils.randomAlphanumeric(50));
        user.setLogin("test");
        user.setFirstName("john");
        user.setLastName("doe");
        user.setEmail("john.doe@jhipster.com");
        user.setImageUrl("http://placehold.it/50x50");
        user.setLangKey("en");
        user.setAuthorities(authorities);
        userRepository.save(user);

        // create security-aware mockMvc
        restUserMockMvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply(springSecurity())
            .build();

        restUserMockMvc.perform(get("/api/account")
            .with(user(user.getLogin()).roles("ADMIN"))
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.login").value("test"))
            .andExpect(jsonPath("$.firstName").value("john"))
            .andExpect(jsonPath("$.lastName").value("doe"))
            .andExpect(jsonPath("$.email").value("john.doe@jhipster.com"))
            .andExpect(jsonPath("$.imageUrl").value("http://placehold.it/50x50"))
            .andExpect(jsonPath("$.langKey").value("en"))
            .andExpect(jsonPath("$.authorities").value(AuthoritiesConstants.ADMIN));
    }

    @Test
    public void testGetUnknownAccount() throws Exception {
        restUserMockMvc.perform(get("/api/account")
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isInternalServerError());
    }
}
