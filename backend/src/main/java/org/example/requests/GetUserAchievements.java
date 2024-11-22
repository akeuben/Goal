package org.example.requests;

import org.example.sql.Game;
import org.example.sql.Mappings;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;

import java.sql.ResultSet;
import java.util.Optional;

public class GetUserAchievements extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");

        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getUserAchievements", username, game);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONArray array = SQLManager.mapResults(result.get(), Mappings.ACHIEVEMENT_MAPPINGS);

        for(int i = 0; i < array.length(); i++) {
            array.getJSONObject(i).put("game", Game.fetchGame(game));
        }

        return array;
    }
}
