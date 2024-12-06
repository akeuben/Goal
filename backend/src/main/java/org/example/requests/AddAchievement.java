package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.Game;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class AddAchievement extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String game_id = request.queryParams("game_id");
        String name = request.queryParams("name");
        String description = request.queryParams("description");
        String score = request.queryParams("score");
        String is_spoiler = request.queryParams("is_spoiler");

        JSONArray developers =  Game.fetchGame(game_id).getJSONArray("developers");
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

        if(!SQLManager.postToDatabase("addAchievement", game_id, name, description, score, is_spoiler)) {
            throw new RuntimeException("Failed to add achievement!");
        }

        return true;
    }
}
