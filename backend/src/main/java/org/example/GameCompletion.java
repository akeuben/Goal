package org.example;

import org.json.JSONException;

public class GameCompletion extends ApiReturn {
    GameCompletion(
            Game game,
            User user,
            String status,
            GameCompletionCategory customStatus
    ) throws JSONException {
        this.jo.put("game", game.toReturn());
        this.jo.put("user", user);
        this.jo.put("status", status);
        this.jo.put("customStatus", customStatus.toReturn());
    }

    GameCompletion(
            Game game,
            User user,
            String status
    ) throws JSONException {
        this.jo.put("game", game.toReturn());
        this.jo.put("user", user);
        this.jo.put("status", status);
        this.jo.put("customStatus", "");
    }
}