package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.CompletionCategory;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class CreateGameCompletionCategory extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String name = request.queryParams("name");
        String colour = "#000000";

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        int order = 0;
        JSONArray currentCategories = CompletionCategory.fetchCompletionCategories(username);
        for(int i = 0; i < currentCategories.length(); i++) {
            int itemOrder = currentCategories.getJSONObject(i).getInt("order");
            if(itemOrder > order) {
                order = itemOrder;
            }
        }
        order++;

        if(!SQLManager.postToDatabase("updateGameCompletionCategory", username, name, colour, order + "", colour, order + "")) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
