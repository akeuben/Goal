package org.example.sql;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.util.Optional;

public class Achievement {
    public static JSONObject fetchAchievement(String id) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getAchievement", id);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONObject object = SQLManager.mapResult(result.get(), Mappings.ACHIEVEMENT_MAPPINGS);

        object.put("game", Game.fetchGame(object.getString("game_id")));

        return object;
    }
}
