package org.example;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class TimelineEntry extends ApiReturn {
    TimelineEntry(
            String user,
            String timestamp,
            String type,
            int achievement
    ) throws JSONException {
        this.jo.put("user", user);
        this.jo.put("timestamp", timestamp);
        this.jo.put("type", type);
        this.jo.put("achievement", achievement);
    }
}