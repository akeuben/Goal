package org.example.requests;

import org.example.sql.SQLManager;
import org.example.sql.Todo;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

public class UpdateUserTodoListEntryDescription extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String list = request.queryParams("list");
        String entry = request.queryParams("entry");
        String description = request.queryParams("description");

        JSONObject object = Todo.getTaskForList(username, game, list, entry);

        if(!SQLManager.postToDatabase("updateTask", username, list, game, entry, description, object.getString("complete"), description)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
