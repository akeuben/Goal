package org.example.requests;

import org.example.sql.Auth;
import org.json.JSONException;
import spark.Request;
import spark.Response;

import java.sql.SQLException;

public class GetSession extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String token = request.queryParams("token");

        try {
            return Auth.getSession(token);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
