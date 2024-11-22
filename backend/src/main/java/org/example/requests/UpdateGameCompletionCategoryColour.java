package org.example.requests;

import org.example.sql.CompletionCategory;
import org.example.sql.SQLManager;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

public class UpdateGameCompletionCategoryColour extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String name = request.queryParams("name");
        String colour = request.queryParams("colour");

        JSONObject category = CompletionCategory.fetchCompletionCategory(username, name);
        String order = "" + category.getInt("order");

        if(!SQLManager.postToDatabase("updateGameCompletionCategory", username, name, colour, order, colour, order)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
