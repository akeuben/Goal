package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class AddGameToLibrary extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");

        SQLManager.postToDatabase("addOwnedGame", username, game, "not_started", "not_started");

        return true;
    }
}
