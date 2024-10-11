package org.example;

//https://www.boxuk.com/insight/creating-a-rest-api-quickly-using-pure-java/
//https://www.baeldung.com/spark-framework-rest-api
//https://www.youtube.com/watch?v=9ntKSLLDeSs

import org.json.JSONArray;
import org.json.JSONObject;
import spark.Response;
import spark.Response.*;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import static spark.Spark.*;

public class Main {

    private static ResultSet getQuery(String query) throws Exception{
        Class.forName("com.mysql.jdbc.Driver");

        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://127.0.0.1:3306/login_schema?allowPublicKeyRetrieval=true&useSSL=false",
                "username",
                "password"
        );

        Statement statement = connection.createStatement();
        return statement.executeQuery(query);
    }

    private static boolean checkAuth(String auth){
        return true;
    }
    
    private static void setHeaders(Response res) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    }

    public static void main(String[] args) {

        get("/sql", (req, res)->{
            setHeaders(res);

            JSONObject returnObject = new JSONObject();

            try{
                ResultSet resultSet = getQuery("SELECT * FROM USERS");

                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    String username = resultSet.getString("username");
                    String password = resultSet.getString("password");
                    jo.put("username", username);
                    jo.put("password", password);

                    returnArray.add(jo);
                }

                returnObject.put("data", returnArray);
                res.status(200);

                return returnObject;
            } catch (Exception e){
                return e.toString();
            }
        });

        // https://github.com/Kappabyte/471-Project/tree/ui/frontend/src/types
        get("/getGameList", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String sort = req.queryParams("sort");
            String filter = req.queryParams("filter");
            String search = req.queryParams("search");

            ArrayList<Game> gameList = new ArrayList<>();
            gameList.add(Examples.game_sc2());
            gameList.add(Examples.game_ow());

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (Game game : gameList){
                ojs.add(game.toReturn());
            }

            res.status(200);
            return ojs;
        });

        get("/getGame", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String game = req.queryParams("game");

            res.status(200);
            return Examples.game_sc2().toReturn();
        });

        get("/getUserScore", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            res.status(200);
            return "5";
        });

        get("/getGameCompletions", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String filter = req.queryParams("filter");
            String username = req.queryParams("username");
            String sort = req.queryParams("sort");
            String search = req.queryParams("search");

            ArrayList<GameCompletion> gameCompletions = new ArrayList<>();

            gameCompletions.add(Examples.game_completion_sc2(username));
            gameCompletions.add(Examples.game_completion_ow(username));

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (GameCompletion gameCompletion : gameCompletions){
                ojs.add(gameCompletion.toReturn());
            }

            res.status(200);
            return new JSONArray(ojs);
        });

        get("/getGameCompletion", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("game");

            res.status(200);
            return Examples.game_completion_sc2(username).toReturn();
        });

        get("/getGameCompletionCategories", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            ArrayList<GameCompletionCategory> gameCompletionCategories = new ArrayList<>();

            gameCompletionCategories.add(Examples.game_completion_category_1(username));
            gameCompletionCategories.add(Examples.game_completion_category_2(username));

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (GameCompletionCategory gameCompletionCategory : gameCompletionCategories){
                ojs.add(gameCompletionCategory.toReturn());
            }

            res.status(200);
            return new JSONArray(ojs);
        });

        get("/updateGameCompletionCategoryName", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String oldName = req.queryParams("oldName");
            String newName = req.queryParams("newName");

            res.status(200);
            return null;
        });

        get("/updateGameCompletionCategoryColour", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String name = req.queryParams("name");
            String colour = req.queryParams("colour");

            res.status(200);
            return null;
        });

        get("/updateGameCompletionBuiltin", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("colour");
            String completionCategory = req.queryParams("completionCategory");

            res.status(200);
            return null;
        });

        get("/updateGameCompletionCustom", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("colour");
            String completionCategory = req.queryParams("completionCategory");

            res.status(200);
            return null;
        });

        get("/getGameAchievements", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String game = req.queryParams("game");

            ArrayList<Achievement> achievements = new ArrayList<>();

            achievements.add(Examples.achievement_ow());
            achievements.add(Examples.achievement_sc2());

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (Achievement achievement : achievements){
                ojs.add(achievement.toReturn());
            }

            res.status(200);
            return new JSONArray(ojs);
        });

        get("/getUser", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            res.status(200);
            return Examples.user().toReturn();
        });

        get("/getUserAchievements", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("game");
            ArrayList<Achievement> achievements = new ArrayList<>();

            achievements.add(Examples.achievement_sc2());

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (Achievement achievement : achievements){
                ojs.add(achievement.toReturn());
            }

            res.status(200);
            JSONArray array = new JSONArray(ojs);
            return array;
        });

        get("/updateUserAchievementState", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String achievement = req.queryParams("achievement");
            String unlocked = req.queryParams("game");

            res.status(200);
            return null;
        });

        get("/getUserTimelineEntries", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            ArrayList<TimelineEntry> timelineEntries = new ArrayList<>();

            timelineEntries.add(Examples.timelineEntry_1());
            timelineEntries.add(Examples.timelineEntry_2());

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (TimelineEntry timelineEntry : timelineEntries){
                ojs.add(timelineEntry.toReturn());
            }

            res.status(200);
            return new JSONArray(ojs);
        });
    }
}
