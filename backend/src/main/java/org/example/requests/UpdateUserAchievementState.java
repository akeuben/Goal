package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.example.sql.Timeline;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateUserAchievementState extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String achievement = request.queryParams("achievement");
        String unlocked = request.queryParams("unlocked");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        if(unlocked.toLowerCase().startsWith("t")) {
            Timeline.postAchievementTimelineEntry(username, achievement);
            return SQLManager.postToDatabase("markAchievementComplete", username, achievement);
        } else {
            return SQLManager.postToDatabase("markAchievementIncomplete", username, achievement);
        }
    }
}
