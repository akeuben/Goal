package org.example;

import org.json.JSONException;

public class GameCompletion extends ApiReturn {
    GameCompletion(
            String game,
            String user,
            String status,
            String customStatus
    ) throws JSONException {
        this.jo.put("game", game);
        this.jo.put("user", user);
        this.jo.put("status", status);
        this.jo.put("customStatus", customStatus);
    }
}