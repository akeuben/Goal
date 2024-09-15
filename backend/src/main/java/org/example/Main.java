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

    public static void main(String[] args) {
        get("/hello", (req, res)->"Hello, world");

        get("/hello/:name/:name2", (req,res)->{
            return "Hellon't, " + req.params(":name") + req.params(":name2");
        });

        get("/json", (req,res)->{
            // response.type("application/json");
            // Response response = new Response();

            JSONObject jo = new JSONObject();
            jo.put("data", "someData");
            jo.put("status", 200);
            return jo;
        });

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

                return returnObject;
            } catch (Exception e){
                return e.toString();
            }
        });

        get("/testParams", "application/json", (req,res)->{
            // http://localhost:4567/testParams?id=XYZ&id2=A

            String id = req.queryParams("id");
            String id2 = req.queryParams("id2");
            return "HI " + id + " " + id2;
        });

        get("/getGameList", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String filter = req.queryParams("filter");
            String search = req.queryParams("search");

            return "Not made";
        });

        get("/getGame", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String game = req.queryParams("game");

            return "Not made";
        });

        get("/getGameCompletions", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String filter = req.queryParams("filter");
            String search = req.queryParams("search");

            return "Not made";
        });

        get("/getGameCompletion", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String game = req.queryParams("game");

            return "Not made";
        });

        get("/getGameCompletionCategories", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");

            return "Not made";
        });

        get("/updateGameCompletionCategoryName", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String oldName = req.queryParams("oldName");
            String newName = req.queryParams("newName");

            return "Not made";
        });

        get("/updateGameCompletionCategoryColour", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String name = req.queryParams("name");
            String colour = req.queryParams("colour");

            return "Not made";
        });

        get("/updateGameCompletionBuiltin", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String game = req.queryParams("colour");
            String completionCategory = req.queryParams("completionCategory");

            return "Not made";
        });

        get("/updateGameCompletionCustom", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String game = req.queryParams("colour");
            String completionCategory = req.queryParams("completionCategory");

            return "Not made";
        });

        get("/getGameAchievements", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String game = req.queryParams("game");

            return "Not made";
        });

        get("/getUser", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");

            return "Not made";
        });

        get("/getUserScore", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");

            return "Not made";
        });

        get("/getUserAchievements", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String game = req.queryParams("game");

            return "Not made";
        });

        get("/updateUserAchievementState", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            String achievement = req.queryParams("achievement");
            String unlocked = req.queryParams("game");

            return "Not made";
        });

        get("/getUserTimelineEntries", "application/json", (req,res)->{
            String authToken = req.queryParams("auth");
            String username = req.queryParams("username");
            
            return "Not made";
        });
    }
}