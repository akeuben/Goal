package org.example;

import org.json.JSONException;

public class Achievement extends ApiReturn {
    Achievement(
            int identifier,
            Game game,
            String name,
            String description,
            boolean spoiler,
            int score
    ) throws JSONException {
        this.jo.put("identifier", identifier);
        this.jo.put("game", game);
        this.jo.put("name", name);
        this.jo.put("description", description);
        this.jo.put("spoiler", spoiler);
        this.jo.put("score", score);
    }
}
