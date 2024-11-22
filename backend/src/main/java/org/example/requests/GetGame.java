package org.example.requests;

import org.example.sql.Game;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class GetGame extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String identifier = request.queryParams("game");

        return Game.fetchGame(identifier);
    }
}
