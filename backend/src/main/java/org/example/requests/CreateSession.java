package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.example.sql.User;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

import java.util.UUID;

public class CreateSession extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String password = request.queryParams("password");

        String expectedHash = Auth.getExpectedHash(username);

        if(!Auth.checkPasswordHash(password, expectedHash)) {
            throw new RuntimeException("Invalid username or Password");
        }

        String sessionToken = UUID.randomUUID().toString();

        JSONObject user = User.fetchUser(username);

        if(!SQLManager.postToDatabase("startUserSession", username, sessionToken, request.ip(), user.getString("email"), "never")) {
            throw new RuntimeException("Failed to create user session");
        }

        JSONObject session = new JSONObject();
        session.put("token", sessionToken);
        session.put("username", username);
        session.put("type", user.getString("type"));

        return session;
    }
}
