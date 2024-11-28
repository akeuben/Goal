package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateUserTodoListName extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String oldName = request.queryParams("list");
        String newName = request.queryParams("name");

        if(!SQLManager.postToDatabase("renameList", newName, username, oldName, game)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
