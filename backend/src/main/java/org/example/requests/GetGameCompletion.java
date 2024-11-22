package org.example.requests;

import org.example.sql.Completion;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class GetGameCompletion extends AbstractRequest{
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");

        return Completion.fetchCompletion(username, game);
    }
}
