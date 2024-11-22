package org.example.requests;

import org.example.sql.Game;
import org.example.sql.Mappings;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;

import java.sql.ResultSet;
import java.util.Optional;

public class GetUserScore extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");

        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getUserScore", username);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        return SQLManager.mapResultInt(result.get(), "score");
    }
}
