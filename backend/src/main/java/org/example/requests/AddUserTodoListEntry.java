package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.example.sql.Todo;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

public class AddUserTodoListEntry extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String list = request.queryParams("list");
        String entry = request.queryParams("name");
        String description = request.queryParams("description");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        if(!SQLManager.postToDatabase("updateTask", username, list, game, entry, description, "0", description)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
