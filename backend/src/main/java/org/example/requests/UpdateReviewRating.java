package org.example.requests;

import org.example.sql.Auth;
import org.example.sql.Review;
import org.example.sql.SQLManager;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

import java.text.SimpleDateFormat;
import java.util.Date;

public class UpdateReviewRating extends AbstractRequest {
    private static final SimpleDateFormat parser = new SimpleDateFormat("yyyyMMdd");
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String rating = request.queryParams("rating");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        JSONObject oldReview = Review.fetchReview(username, game);
        String text = "";
        if(oldReview != null && oldReview.has("text")) {
            text = oldReview.getString("text");
        }

        if(!SQLManager.postToDatabase("updateGameReview", username, game, parser.format(new Date()), parser.format(new Date()), text, rating, text, rating)) {
            throw new RuntimeException("Failed to update review rating");
        }
        return true;
    }
}
