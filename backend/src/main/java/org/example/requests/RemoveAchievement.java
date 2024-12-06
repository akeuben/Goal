package org.example.requests;

import org.example.sql.Achievement;
import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

public class RemoveAchievement extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String achievement_number = request.queryParams("achievement_number");

        JSONObject achievement = Achievement.fetchAchievement(achievement_number);
        JSONArray developers = achievement.getJSONObject("game").getJSONArray("developers");
        boolean authenticated = false;
        for(int i = 0; i < developers.length(); i++) {
            if(Auth.simpleAuthCheck(request, developers.getString(i), false, true)) {
                authenticated = true;
                break;
            }
        }

        if(!authenticated) {
            throw new RuntimeException("Not authorized");
        }

        if(!SQLManager.postToDatabase("removeAchievement", achievement_number)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
