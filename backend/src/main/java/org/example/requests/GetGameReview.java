package org.example.requests;

import org.example.sql.Mappings;
import org.example.sql.Review;
import org.example.sql.SQLManager;
import org.json.JSONException;
import spark.Request;
import spark.Response;

import java.sql.ResultSet;
import java.util.Optional;

public class GetGameReview extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");

        return Review.fetchReview(username, game);
    }
}
