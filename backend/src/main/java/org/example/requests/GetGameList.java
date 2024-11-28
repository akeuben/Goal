package org.example.requests;

import org.example.sql.Game;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class GetGameList extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String sort = request.queryParams("sort");
        String filter = request.queryParams("filter");
        String search = "%" + request.queryParams("search") + "%";

        return Game.fetchGames(search);
    }
}
