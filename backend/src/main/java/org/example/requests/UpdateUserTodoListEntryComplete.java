package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateUserTodoListEntryComplete extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String list = request.queryParams("list");
        String entry = request.queryParams("entry");
        String complete = request.queryParams("complete");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        if (complete.equals("true")) {
            if(!SQLManager.postToDatabase("markListItemComplete", username, list, game, entry)) {
                throw new RuntimeException("Failed to update");
            }
            return true;
        } else if (complete.equals("false")) {
            if(!SQLManager.postToDatabase("markListItemIncomplete", username, list, game, entry)) {
                throw new RuntimeException("Failed to update");
            }
            return true;
        }
        throw new RuntimeException("complete must be true or false");
    }
}
