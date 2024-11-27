package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGameReleaseYear extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String release_year = request.queryParams("release_year");
        String game_id = request.queryParams("game_id");

        if(!SQLManager.postToDatabase("updateGameReleaseYear", release_year, game_id)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}