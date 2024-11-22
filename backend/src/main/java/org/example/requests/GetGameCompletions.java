package org.example.requests;

import org.example.sql.Completion;
import org.json.JSONException;
import spark.Request;
import spark.Response;

public class GetGameCompletions extends AbstractRequest{
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String sortBy = request.queryParams("sortBy");
        String sortAscending = request.queryParams("sortAscending");
        String filterReleaseFrom = request.queryParams("filterReleaseFrom");
        String filterReleaseTo = request.queryParams("filterReleaseTo");
        String filterHasAchievements = request.queryParams("filterHasAchievements");
        String search = request.queryParams("search");

        return Completion.fetchCompletions(username);
    }
}
