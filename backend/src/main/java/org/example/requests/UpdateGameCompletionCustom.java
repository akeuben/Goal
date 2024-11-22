package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGameCompletionCustom extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String name = request.queryParams("completionCategory");
        SQLManager.postToDatabase("updateGameCompletionCustom", username, game);
        SQLManager.postToDatabase("addCustomCompletion", username, game, name, name);

        return true;
    }
}
