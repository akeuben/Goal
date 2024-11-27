package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGameName extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String name = request.queryParams("name");
        String game_id = request.queryParams("game_id");

        if(!SQLManager.postToDatabase("updateGameName", name, game_id)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}