package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.example.sql.Timeline;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGameCompletionCustom extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String name = request.queryParams("completionCategory");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        SQLManager.postToDatabase("updateGameCompletionCustom", username, game);
        SQLManager.postToDatabase("addCustomCompletion", username, game, name, name);
        Timeline.postCustomGameTimelineEntry(username, game, name);

        return true;
    }
}
