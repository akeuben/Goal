package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class UpdateGameCompletionCategoryName extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String oldName = request.queryParams("oldName");
        String newName = request.queryParams("newName");

        System.out.println("Request: " + username + ", " + oldName + ", " + newName);

        if(!SQLManager.postToDatabase("updateCompletionCategoryName", newName, username, oldName)) {
            throw new RuntimeException("Failed to update");
        }
        return true;
    }
}
