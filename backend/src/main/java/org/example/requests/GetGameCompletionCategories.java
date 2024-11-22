package org.example.requests;

import org.example.sql.CompletionCategory;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class GetGameCompletionCategories extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");

        return CompletionCategory.fetchCompletionCategories(username);
    }
}
