package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class RemoveGameFromLibrary extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");

        SQLManager.postToDatabase("removeOwnedGame", username, game);
        SQLManager.postToDatabase("removeAchievementTimelineEntries", username, game);
        SQLManager.postToDatabase("removeGameTimelineEntries", username, game);
        SQLManager.postToDatabase("removeCustomGameTimelineEntries", username, game);
        SQLManager.postToDatabase("removeCompletedAchievements", username, game);
        SQLManager.postToDatabase("removeReview", username, game);

        return true;
    }
}
