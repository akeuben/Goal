package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGamePublisher extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String publisher = request.queryParams("publisher");
        String game_id = request.queryParams("game_id");

        if(!SQLManager.postToDatabase("updateGamePublisher", publisher, game_id)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}