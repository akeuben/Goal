package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class RemoveUserTodoListEntry extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String list = request.queryParams("list");
        String entry = request.queryParams("entry");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        if(!SQLManager.postToDatabase("removeListItem", username, list, game, entry)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
