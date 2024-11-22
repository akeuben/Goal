package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class RemoveUserTodoList extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String name = request.queryParams("list");

        if(!SQLManager.postToDatabase("removeList", username, game, name)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
