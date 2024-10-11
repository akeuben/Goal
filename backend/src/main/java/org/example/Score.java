package org.example;

import org.json.JSONException;

public class Score extends ApiReturn {
    Score(
            int score
    ) throws JSONException {
        this.jo.put("score", score);
    }
}
