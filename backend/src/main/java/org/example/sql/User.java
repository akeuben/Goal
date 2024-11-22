package org.example.sql;

import org.json.JSONObject;

import java.sql.ResultSet;
import java.util.Optional;

public class User {
    public static JSONObject fetchUser(String username) {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getUser", username);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        return SQLManager.mapResult(result.get(), Mappings.USER_MAPPINGS);
    }
}
