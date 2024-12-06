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

public class UpdateReviewText extends AbstractRequest {
    private static final SimpleDateFormat parser = new SimpleDateFormat("yyyyMMdd");
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String username = request.queryParams("username");
        String game = request.queryParams("game");
        String text = request.queryParams("text");

        if(!Auth.simpleAuthCheck(request, username, true, false)) {
            throw new RuntimeException("Not Authorized");
        }

        JSONObject oldReview = Review.fetchReview(username, game);
        String rating = "0";
        if(oldReview != null && oldReview.has("rating")) {
            rating = oldReview.getString("rating");
        }

        if(!SQLManager.postToDatabase("updateGameReview", username, game, parser.format(new Date()), parser.format(new Date()), text, rating, text, rating)) {
            throw new RuntimeException("Failed to update review text");
        }
        return true;
    }
}
