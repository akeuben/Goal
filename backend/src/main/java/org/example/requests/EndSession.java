package org.example.requests;

import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class EndSession extends AbstractRequest{
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");

        SQLManager.postToDatabase("endSession", username);

        return true;
    }
}
