package org.example.sql;

import org.json.JSONObject;

import java.sql.ResultSet;
import java.util.Optional;

public class Review {

    public static JSONObject fetchReview(String username, String game) {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGameReview", username, game);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        return SQLManager.mapResult(result.get(), Mappings.GAME_REVIEW_MAPPINGS);
    }
}
