package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class Register extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String password = request.queryParams("password");
        String email = request.queryParams("email");
        String userType = request.queryParams("type");

        String passwordHash = Auth.getPasswordHash(password);

        if(!SQLManager.postToDatabase("addUser", username, passwordHash, email, userType)) {
            throw new RuntimeException("Failed to add user.");
        }

        return true;
    }
}
