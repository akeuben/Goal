package org.example.requests;

import org.example.sql.Todo;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class GetUserTodoLists extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");

        return Todo.getTodoLists(username, game);
    }
}
