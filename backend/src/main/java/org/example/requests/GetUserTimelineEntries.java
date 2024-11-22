package org.example.requests;

import org.example.sql.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

import java.sql.ResultSet;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Optional;

public class GetUserTimelineEntries extends AbstractRequest {

    private static final HashMap<String, String> MAPPINGS = new HashMap<>();
    private static final SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    static {
        MAPPINGS.put("username", "username");
        MAPPINGS.put("datetime", "datetime");
        MAPPINGS.put("game_id", "game_id");
        MAPPINGS.put("achievement_number", "achievement_number");
        MAPPINGS.put("status", "status");
        MAPPINGS.put("name", "name");
        MAPPINGS.put("type", "type");
    }

    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");

        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getUserTimelineEntries", username);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONArray array = SQLManager.mapResults(result.get(), MAPPINGS);
        JSONArray returnArray = new JSONArray();

        for(int i = 0; i < array.length(); i++) {
            JSONObject original = array.getJSONObject(i);
            if(original.getString("type").equals("achievement")) {
                try {
                    returnArray.put(mapToAchievementEntry(original));
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            } else {
                try {
                    returnArray.put(mapToGameEntry(original));
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return returnArray;
    }

    private JSONObject mapToAchievementEntry(JSONObject original) throws JSONException, ParseException {
        JSONObject entry = new JSONObject();
        entry.put("user", User.fetchUser(original.getString("username")));
        entry.put("timestamp", parser.parse(original.getString("datetime")).getTime());
        entry.put("type", "achievement");
        entry.put("achievement", Achievement.fetchAchievement(original.getString("achievement_number")));
        return entry;
    }

    private JSONObject mapToGameEntry(JSONObject original) throws JSONException, ParseException {
        JSONObject entry = new JSONObject();
        entry.put("user", User.fetchUser(original.getString("username")));
        entry.put("timestamp", parser.parse(original.getString("datetime")).getTime());
        entry.put("type", "game");

        JSONObject completion = new JSONObject();
        completion.put("game", Game.fetchGame(original.getString("game_id")));
        completion.put("user", original.getString("username"));
        completion.put("status", original.getString("status"));

        if(completion.getString("status").equals("custom")) {
            JSONObject customStatus = CompletionCategory.fetchCompletionCategory(completion.getString("user"), original.getString("name"));
            completion.put("customStatus", customStatus);
        }

        entry.put("completion", completion);
        return entry;
    }
}
