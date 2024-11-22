package org.example.requests;

import org.example.sql.Game;
import org.example.sql.User;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class GetUser extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");

        return User.fetchUser(username);
    }
}
