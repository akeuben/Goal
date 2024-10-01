package org.example;

//https://www.boxuk.com/insight/creating-a-rest-api-quickly-using-pure-java/
//https://www.baeldung.com/spark-framework-rest-api
//https://www.youtube.com/watch?v=9ntKSLLDeSs

import org.json.JSONObject;
import spark.Response;
import spark.Response.*;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

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
            gameList.add(new Game(
                    "aleksSecondFavoriteGame",
                    "Starcraft 2",
                    2016,
                    "Iron Galaxy",
                    "Blizzard Entertainment",
                    "Overwatch was a 2016 team-based multiplayer first-person shooter game by Blizzard " +
                            "Entertainment."
            ));
            gameList.add(new Game(
                    "aleksIsSadTheyKilledIt",
                    "Overwatch",
                    2010,
                    "Blizzard",
                    "Blizzard Entertainment",
                    "Set in the future, the game centers on a galactic struggle for dominance among the " +
                            "various fictional races of StarCraft."
            ));

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
            return new Game(
                    "ABCXYZ",
                    "Starcraft 2",
                    2010,
                    "Blizzard",
                    "Blizzard Entertainment",
                    "Set in the future, the game centers on a galactic struggle for dominance among the " +
                            "various fictional races of StarCraft."
            ).toReturn();
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

            gameCompletions.add(new GameCompletion(
                    "Starcraft 2",
                    "test",
                    "",
                    "totallyRealStatus"
            ));
            gameCompletions.add(new GameCompletion(
                    "Overwatch",
                    "test",
                    "Died",
                    ""
            ));

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (GameCompletion gameCompletion : gameCompletions){
                ojs.add(gameCompletion.toReturn());
            }

            res.status(200);
            return ojs;
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
            return new GameCompletion(
                    "Starcraft 2",
                    username,
                    "",
                    "totallyRealStatus"
            ).toReturn();
        });

        get("/getGameCompletionCategories", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            ArrayList<GameCompletionCategory> gameCompletionCategories = new ArrayList<>();

            gameCompletionCategories.add(new GameCompletionCategory(
                    "Starcraft 2",
                    username,
                    "red",
                    1)
            );
            gameCompletionCategories.add(new GameCompletionCategory(
                    "Starcraft 2",
                    username,
                    "blue",
                    2)
            );

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (GameCompletionCategory gameCompletionCategory : gameCompletionCategories){
                ojs.add(gameCompletionCategory.toReturn());
            }

            res.status(200);
            return ojs;
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

            achievements.add(new Achievement(
                5,
                "Overwatch",
                "Start",
                "Open the game",
                true,
                -1
            ));

            achievements.add(new Achievement(
                6,
                "Overwatch",
                "Close The Game",
                "Realize this game has died",
                false,
                5
            ));

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (Achievement achievement : achievements){
                ojs.add(achievement.toReturn());
            }

            res.status(200);
            return ojs;
        });

        get("/getUser", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            ArrayList<Achievement> achievements = new ArrayList<>();
            achievements.add(new Achievement(
                    5,
                    "Overwatch",
                    "Start",
                    "Open the game",
                    true,
                    8
            ));
            achievements.add(new Achievement(
                    6,
                    "Starcraft 2",
                    "Addicted",
                    "Unlock protoss from the selection",
                    false,
                    5
            ));
            ArrayList<JSONObject> achievementsOjs = new ArrayList<>();
            for (Achievement achievement : achievements){
                achievementsOjs.add(achievement.toReturn());
            }

            ArrayList<Game> gameList = new ArrayList<>();
            gameList.add(new Game(
                    "aleksSecondFavoriteGame",
                    "Starcraft 2",
                    2016,
                    "Iron Galaxy",
                    "Blizzard Entertainment",
                    "Overwatch was a 2016 team-based multiplayer first-person shooter game by Blizzard " +
                            "Entertainment."
            ));
            gameList.add(new Game(
                    "aleksIsSadTheyKilledIt",
                    "Overwatch",
                    2010,
                    "Blizzard",
                    "Blizzard Entertainment",
                    "Set in the future, the game centers on a galactic struggle for dominance among the " +
                            "various fictional races of StarCraft."
            ));
            ArrayList<JSONObject> gameOjs = new ArrayList<>();
            for (Game game : gameList){
                gameOjs.add(game.toReturn());
            }

            res.status(200);
            return new User(
                    username,
                    achievementsOjs,
                    gameOjs
            ).toReturn();
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

            achievements.add(new Achievement(
                    5,
                    "Overwatch",
                    "Start",
                    "Open the game",
                    true,
                    8
            ));

            achievements.add(new Achievement(
                    6,
                    "Starcraft 2",
                    "Addicted",
                    "Unlock protoss from the selection",
                    false,
                    5
            ));

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (Achievement achievement : achievements){
                ojs.add(achievement.toReturn());
            }

            res.status(200);
            return ojs;
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

            timelineEntries.add(new TimelineEntry(
                    username,
                    "2024-09-29 20:22:05",
                    new GameCompletion(
                            "Starcraft 2",
                            username,
                            "",
                            "totallyRealStatus"
                    )
            ));

            timelineEntries.add(new TimelineEntry(
                    username,
                    "2024-12-25 18:00:37",
                    new Achievement(
                        6,
                        "Starcraft 2",
                        "Addicted",
                        "Unlock protoss from the selection",
                        false,
                        5
                    )
            ));

            ArrayList<JSONObject> ojs = new ArrayList<>();
            for (TimelineEntry timelineEntry : timelineEntries){
                ojs.add(timelineEntry.toReturn());
            }

            res.status(200);
            return ojs;
        });
    }
}
