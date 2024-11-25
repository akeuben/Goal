package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateUserTodoListEntryName extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String list = request.queryParams("list");
        String oldName = request.queryParams("entry");
        String newName = request.queryParams("name");

        if(!SQLManager.postToDatabase("renameListItem", newName, username, list, oldName, game)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
