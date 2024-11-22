package org.example.sql;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.util.Optional;

public class Completion {

    public static JSONObject fetchCompletion(String username, String game) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGameCompletion", username, game);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONObject completion = SQLManager.mapResult(result.get(), Mappings.COMPLETION_MAPPINGS);
        completion.put("game", Game.fetchGame(completion.getString("game_id")));

        if(completion.getString("status").equals("custom")) {
            completion.put("customStatus", CompletionCategory.fetchCompletionCategoryForGame(username, game));
        }

        return completion;
    }

    public static JSONArray fetchCompletions(String username) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGameCompletions", username);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONArray completions = SQLManager.mapResults(result.get(), Mappings.COMPLETION_MAPPINGS);

        for(int i = 0; i < completions.length(); i++) {
            JSONObject object = completions.getJSONObject(i);

            object.put("game", Game.fetchGame(object.getString("game_id")));
            if(object.getString("status").equals("custom")) {
                object.put("customStatus", CompletionCategory.fetchCompletionCategoryForGame(username, object.getString("game_id")));
            }
        }

        return completions;
    }
}
