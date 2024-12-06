package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class CreateGame extends AbstractRequest {
    @Override
    protected synchronized Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("developer");
        String name = request.queryParams("name");
        String description = request.queryParams("description");
        String release_year = request.queryParams("release_year");
        String publisher = request.queryParams("publisher");

        if(!Auth.simpleAuthCheck(request, username, false, true)) {
            throw new RuntimeException("Not Authorized");
        }

        // I needed to add null as the game_id to make AUTO_INCREMENT work on my machine
        if(!SQLManager.postToDatabase("createGame", name, description, release_year, publisher)) {
            throw new RuntimeException("Failed to update");
        }

        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getLastAddedGame");

        if(result.isEmpty()) {
            throw new RuntimeException("Failed to fetch added game");
        }

        JSONObject added = SQLManager.mapResult(result.get(), Map.of("game_id", "game_id"));
        assert added != null;

        if(!SQLManager.postToDatabase("addGameDeveloper", username, added.getString("game_id"))) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
