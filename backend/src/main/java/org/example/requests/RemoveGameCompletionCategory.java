package org.example.requests;

import org.example.sql.CompletionCategory;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class RemoveGameCompletionCategory extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String name = request.queryParams("name");

        if(!SQLManager.postToDatabase("removeGameCompletionCategory", username, name)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
