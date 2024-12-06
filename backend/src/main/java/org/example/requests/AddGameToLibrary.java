package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.SQLManager;
import org.example.sql.Timeline;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class AddGameToLibrary extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        SQLManager.postToDatabase("addOwnedGame", username, game, "not_started", "not_started");

        Timeline.postGameTimelineEntry(username, game, "not_started");

        return true;
    }
}
