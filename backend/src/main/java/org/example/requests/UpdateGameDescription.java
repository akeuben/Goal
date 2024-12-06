package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.Game;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGameDescription extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String description = request.queryParams("description");
        String game_id = request.queryParams("game_id");

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

        if(!SQLManager.postToDatabase("updateGameDescription", description, game_id)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}