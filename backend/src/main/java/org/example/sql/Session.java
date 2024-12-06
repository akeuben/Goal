package org.example.sql;

import org.json.JSONException;
import org.json.JSONObject;

public record Session(String username, String token, String userType) {

    @Override
    public String toString() {
        JSONObject object = new JSONObject();
        try {
            object.put("username", username);
            object.put("token", token);
            object.put("type", userType);
            return object.toString();
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
