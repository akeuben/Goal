package org.example.sql;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.util.Optional;

public class Game {
    public static JSONObject fetchGame(String identifier) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGame", identifier);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONObject object = SQLManager.mapResult(result.get(), Mappings.GAME_MAPPINGS);

        Optional<ResultSet> developers = SQLManager.fetchFromDatabase("getGameDevelopers", identifier);

        if(developers.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        object.put("developers", SQLManager.mapResults(developers.get(), "username"));

        return object;
    }

    public static JSONArray fetchGames(String search) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGameList", search);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONArray array = SQLManager.mapResults(result.get(), Mappings.GAME_MAPPINGS);
        for(int i = 0; i < array.length(); i++) {
            JSONObject object = array.getJSONObject(i);
            Optional<ResultSet> developers = SQLManager.fetchFromDatabase("getGameDevelopers", object.getString("identifier"));

            if (developers.isEmpty()) {
                throw new RuntimeException("Internal Database Error.");
            }

            object.put("developers", SQLManager.mapResults(developers.get(), "username"));
        }

        return array;
    }
}
