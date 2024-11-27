package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class RemoveAchievement extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String achievement_number = request.queryParams("achievement_number");

        if(!SQLManager.postToDatabase("removeAchievement", achievement_number)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
