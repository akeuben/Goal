package org.example;

import org.json.JSONException;

public class GameCompletionCategory extends ApiReturn {
    GameCompletionCategory(
            String user,
            String name,
            String colour,
            int order
    ) throws JSONException {
        this.jo.put("user", user);
        this.jo.put("name", name);
        this.jo.put("colour", colour);
        this.jo.put("order", order);
    }
}