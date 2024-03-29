package com.cardx.Cardx.Services;

import com.cardx.Cardx.DAO.Repository;
import com.cardx.Cardx.Helper.Constants;
import com.cardx.Cardx.Helper.EventHelper;
import com.cardx.Cardx.Model.Request.UserDetailsRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsService {

    @Autowired
    Repository repository;

    @Autowired
    EventHelper eventHelper;

    private final JdbcTemplate jdbcTemplate;

    private final ObjectMapper mapper = new ObjectMapper();

    private static final Logger logger = LogManager.getLogger(UserDetailsService.class);
    private static final String method = "setUserDetails";

    public UserDetailsService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public ResponseEntity<String> setUserDetails(String userDetails) throws Exception {
        logger.debug(method + ": User Details: {}", userDetails );

        UserDetailsRequest ur;
        try{
            String sql = repository.addUserDetails();
            ur = mapper.readValue(userDetails, UserDetailsRequest.class);

            int ans = jdbcTemplate.update(sql, ur.getUserId(), ur.getUserFirstName(), ur.getUserLastName(), ur.getUserPreferName(),
                    ur.getUserContact(), ur.getUserEmail());

            if(ans == 1){
                String user = mapper.writeValueAsString(ur);
                // Event Log
                eventHelper.logEvent(Constants.STAGE_USER_DETAILS_ADD, ur.getUserId(), user);
               return ResponseEntity.status(200).body(user);
            }else{
               return ResponseEntity.status(207).body(Constants.ERROR_MSG_FOR_NOT_ADD_DATA);
            }
        }catch (Exception e){
            throw new Exception("Error in setUserDetails");
        }
    }
}
