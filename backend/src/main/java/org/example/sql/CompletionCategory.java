package org.example.sql;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.util.Optional;

public class CompletionCategory {

    public static JSONObject fetchCompletionCategoryForGame(String username, String game) throws JSONException {
        System.out.println("Fetching for " + username + " @ " + game);
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGameCompletionCategory", username, game);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        return SQLManager.mapResult(result.get(), Mappings.COMPLETION_CATEGORY_MAPPINGS);
    }

    public static JSONArray fetchCompletionCategories(String username) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGameCompletionCategories", username);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        return SQLManager.mapResults(result.get(), Mappings.COMPLETION_CATEGORY_MAPPINGS);
    }
}
