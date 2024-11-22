package org.example;

//https://www.boxuk.com/insight/creating-a-rest-api-quickly-using-pure-java/
//https://www.baeldung.com/spark-framework-rest-api
//https://www.youtube.com/watch?v=9ntKSLLDeSs

import org.example.requests.*;
import spark.Response;
import spark.Spark;

import java.sql.*;

public class Main {

    public static void main(String[] args) {
        Spark.notFound((request, response) -> {
            response.status(404);
            return "Not found";
        });
        new GetGameList().register("getGameList");
        new GetGame().register("getGame");
        new GetGameCompletions().register("getGameCompletions");
        new GetGameCompletion().register("getGameCompletion");
        new GetGameCompletionCategories().register("getGameCompletionCategories");
        new UpdateGameCompletionBuiltin().register("updateGameCompletionBuiltin");
        new UpdateGameCompletionCustom().register("updateGameCompletionCustom");
        new UpdateGameCompletionCategoryName().register("updateGameCompletionCategoryName");
        new UpdateGameCompletionCategoryColour().register("updateGameCompletionCategoryColour");
        new GetGameAchievements().register("getGameAchievements");
        new GetUser().register("getUser");
        new GetUserScore().register("getUserScore");
        new GetUserAchievements().register("getUserAchievements");
        new UpdateUserAchievementState().register("updateUserAchievementState");
        new GetUserTimelineEntries().register("getUserTimelineEntries");
        new GetGameReview().register("getGameReview");
        new UpdateReviewText().register("setGameReviewText");
        new UpdateReviewRating().register("setGameReviewRating");
        new CreateGameCompletionCategory().register("createGameCompletionCategory");
        new RemoveGameCompletionCategory().register("removeGameCompletionCategory");
        new UpdateGameCompletionCategoryOrder().register("updateGameCompletionCategoryOrder");
    }
}
