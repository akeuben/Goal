package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGameCompletionBuiltin extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String name = request.queryParams("completionCategory");
        SQLManager.postToDatabase("updateGameCompletionBuiltin", name, username, game);
        SQLManager.postToDatabase("removeCustomCompletion", username, game);

        return true;
    }
}
