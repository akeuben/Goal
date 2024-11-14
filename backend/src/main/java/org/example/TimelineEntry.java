package org.example;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class TimelineEntry extends ApiReturn {
    TimelineEntry(
            User user,
            String timestamp,
            GameCompletion gameCompletion
    ) throws JSONException {
        this.jo.put("user", user);
        this.jo.put("timestamp", timestamp);
        this.jo.put("type", "game");
        this.jo.put("completion", gameCompletion.toReturn());
    }

    TimelineEntry(
            User user,
            String timestamp,
            Achievement achievement
    ) throws JSONException {
        this.jo.put("user", user);
        this.jo.put("timestamp", timestamp);
        this.jo.put("type", "achievement");
        this.jo.put("achievement", achievement.toReturn());
    }
}