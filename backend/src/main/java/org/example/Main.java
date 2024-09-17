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

    public static void main(String[] args) {

        get("/sql", (req, res)->{
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
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

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

            return gameList;
        });

        get("/getGame", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String game = req.queryParams("game");

            return new Game(
                    "ABCXYZ",
                    "Starcraft 2",
                    2010,
                    "Blizzard",
                    "Blizzard Entertainment",
                    "Set in the future, the game centers on a galactic struggle for dominance among the " +
                            "various fictional races of StarCraft."
            );
        });

        get("/getGameCompletions", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String filter = req.queryParams("filter");
            String search = req.queryParams("search");

            ArrayList<GameCompletion> gameCompletions = new ArrayList<>();

            gameCompletions.add(new GameCompletion(
                    "Starcraft 2",
                    "aleks",
                    "",
                    "totallyRealStatus"
            ));
            gameCompletions.add(new GameCompletion(
                    "Overwatch",
                    "aleks",
                    "Died",
                    ""
            ));

            return gameCompletions;
        });

        get("/getGameCompletion", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("game");

            return  new GameCompletion(
                    "Starcraft 2",
                    "aleks",
                    "",
                    "totallyRealStatus"
            );
        });

        get("/getGameCompletionCategories", "application/json", (req,res)->{
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

            return "Not made";
        });

        get("/updateGameCompletionCategoryName", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String oldName = req.queryParams("oldName");
            String newName = req.queryParams("newName");

            return "Not made";
        });

        get("/updateGameCompletionCategoryColour", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String name = req.queryParams("name");
            String colour = req.queryParams("colour");

            return "Not made";
        });

        get("/updateGameCompletionBuiltin", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("colour");
            String completionCategory = req.queryParams("completionCategory");

            return "Not made";
        });

        get("/updateGameCompletionCustom", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("colour");
            String completionCategory = req.queryParams("completionCategory");

            return "Not made";
        });

        get("/getGameAchievements", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String game = req.queryParams("game");

            return "Not made";
        });

        get("/getUser", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            return "Not made";
        });

        get("/getUserScore", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            return "Not made";
        });

        get("/getUserAchievements", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String game = req.queryParams("game");

            return "Not made";
        });

        get("/updateUserAchievementState", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            String achievement = req.queryParams("achievement");
            String unlocked = req.queryParams("game");

            return "Not made";
        });

        get("/getUserTimelineEntries", "application/json", (req,res)->{
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            
            return "Not made";
        });
    }
}