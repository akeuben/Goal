package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class CreateGame extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String name = request.queryParams("name");
        String description = request.queryParams("description");
        String release_year = request.queryParams("release_year");
        String publisher = request.queryParams("publisher");

        if(!SQLManager.postToDatabase("createGame", name, description, release_year, publisher)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
