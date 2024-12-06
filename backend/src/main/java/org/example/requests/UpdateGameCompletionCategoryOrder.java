package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.CompletionCategory;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

public class UpdateGameCompletionCategoryOrder extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String name = request.queryParams("name");
        String direction = request.queryParams("direction");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        JSONObject other = null;
        JSONObject category = CompletionCategory.fetchCompletionCategory(username, name);
        JSONArray list = CompletionCategory.fetchCompletionCategories(username);

        if(direction.equals("prev")) {
            other = findPrevious(category, list);
        } else if(direction.equals("next")) {
            other = findNext(category, list);
        }

        if(other != null) {
            if(!swap(category, other)) {
                throw new RuntimeException("Failed to swap");
            }
        }

        return CompletionCategory.fetchCompletionCategories(username);
    }

    private JSONObject findNext(JSONObject current, JSONArray list) throws JSONException {
        int currentOrder = current.getInt("order");

        JSONObject next = null;
        int nextOrder = Integer.MAX_VALUE;
        for(int i = 0; i < list.length(); i++) {
            JSONObject test = list.getJSONObject(i);
            int testOrder = test.getInt("order");
            if(testOrder > currentOrder && testOrder < nextOrder) {
                nextOrder = testOrder;
                next = test;
            }
        }

        return next;
    }

    private JSONObject findPrevious(JSONObject current, JSONArray list) throws JSONException {
        int currentOrder = current.getInt("order");

        JSONObject prev = null;
        int prevOrder = Integer.MIN_VALUE;
        for(int i = 0; i < list.length(); i++) {
            JSONObject test = list.getJSONObject(i);
            int testOrder = test.getInt("order");
            if(testOrder < currentOrder && testOrder > prevOrder) {
                prevOrder = testOrder;
                prev = test;
            }
        }

        return prev;
    }

    private boolean swap(JSONObject first, JSONObject second) throws JSONException {
        if(!SQLManager.postToDatabase("updateGameCompletionCategory",
                first.getString("user"),
                first.getString("name"),
                first.getString("colour"),
                second.getString("order"),
                first.getString("colour"),
                second.getString("order"))) {
            return false;
        }

        return SQLManager.postToDatabase("updateGameCompletionCategory",
                second.getString("user"),
                second.getString("name"),
                second.getString("colour"),
                first.getString("order"),
                second.getString("colour"),
                first.getString("order"));
    }
}
