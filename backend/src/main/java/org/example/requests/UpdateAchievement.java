package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateAchievement extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String achievement_number = request.queryParams("achievement_number");
        String game_id = request.queryParams("game_id");
        String name = request.queryParams("name");
        String description = request.queryParams("description");
        String score = request.queryParams("score");
        String is_spoiler = request.queryParams("is_spoiler");

        if(!SQLManager.postToDatabase("updateGameDescription", achievement_number, game_id, name, description, score, is_spoiler)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}