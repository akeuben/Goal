package org.example;

//https://www.boxuk.com/insight/creating-a-rest-api-quickly-using-pure-java/
//https://www.baeldung.com/spark-framework-rest-api
//https://www.youtube.com/watch?v=9ntKSLLDeSs

import org.json.JSONArray;
import org.json.JSONObject;
import spark.Response;
import spark.Response.*;
import spark.utils.IOUtils;

import java.io.FileInputStream;
import java.sql.*;
import java.util.ArrayList;

import static spark.Spark.*;

public class Main {

    private static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");

        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://127.0.0.1:3306/login_schema?allowPublicKeyRetrieval=true&useSSL=false",
                "username",
                "password"
        );

        return connection;
    }

    private static boolean checkAuth(String token){
        // Objects used in querying
        String rawStatement;
        JSONObject returnObject = new JSONObject();

        // Execute query
        try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/checkAuth.sql")) {
            // Get raw statements (still has ?'s in it)
            rawStatement = IOUtils.toString(inputStream);

            // Turn into and execute prepared statement
            PreparedStatement preparedStatement;
            preparedStatement = getConnection().prepareStatement(rawStatement);
            preparedStatement.setString(1, token);
            ResultSet resultSet = preparedStatement.executeQuery();
            return Boolean.parseBoolean(resultSet.getString("tokenExists"));
        } catch (Exception e){
            // Uh oh
            return false;
        }
    }
    
    private static void setHeaders(Response res) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    }

    public static void main(String[] args) {

        get("/getGameList", "application/json", (req,res)->{
            setHeaders(res);

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            String sort = req.queryParams("sort");
            String filter = req.queryParams("filter");
            String search = "%" + req.queryParams("search") + "%";

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getGameList.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setString(1, search);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("game_id", resultSet.getString("game_id"));
                    jo.put("name", resultSet.getString("name"));
                    jo.put("description", resultSet.getString("description"));
                    jo.put("release_year", resultSet.getString("release_year"));
                    jo.put("publisher", resultSet.getString("publisher"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
        });

        get("/getGame", "application/json", (req,res)->{
            setHeaders(res);

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            String game = req.queryParams("game");

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getGame.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setString(1, game);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("game_id", resultSet.getString("game_id"));
                    jo.put("name", resultSet.getString("name"));
                    jo.put("description", resultSet.getString("description"));
                    jo.put("release_year", resultSet.getString("release_year"));
                    jo.put("publisher", resultSet.getString("publisher"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
        });

        get("/getUserScore", "application/json", (req,res)->{
            setHeaders(res);

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            String username = req.queryParams("username");

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getGame.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setString(1, username);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("score", resultSet.getInt("score"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
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

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            String username = req.queryParams("username");
            int gameId = Integer.parseInt(req.queryParams("gameId"));

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getGameList.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setString(1, username);
                preparedStatement.setInt(2, gameId);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("gameCompleted", resultSet.getBoolean("gameCompleted"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
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

        get("/updateGameCompletionCustom", "application/json", (req,res)->{
            setHeaders(res);

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            String username = req.queryParams("username");
            int gameId = Integer.parseInt(req.queryParams("gameId"));
            String category = req.queryParams("category");
            String colour = req.queryParams("colour");
            int ordering = Integer.parseInt(req.queryParams("ordering"));

            // Objects used in querying
            String rawStatement;

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/updateGameCompletionCustom.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);

                preparedStatement.setString(1, username);
                preparedStatement.setInt(2, gameId);
                preparedStatement.setString(3, category);
                preparedStatement.setString(4, colour);
                preparedStatement.setInt(5, ordering);

                preparedStatement.setString(6, category);
                preparedStatement.setString(7, colour);
                preparedStatement.setInt(8, ordering);
                preparedStatement.executeQuery();


                res.status(200);
                return null;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
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

        get("/updateGameCompletionCategory", "application/json", (req,res)->{
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

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            int gameId = Integer.parseInt(req.queryParams("gameId"));

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getGameAchievements.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setInt(1, gameId);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("achievement_number", resultSet.getInt("game_id"));
                    jo.put("game_id", resultSet.getInt("name"));
                    jo.put("name", resultSet.getString("description"));
                    jo.put("description", resultSet.getString("release_year"));
                    jo.put("score", resultSet.getInt("publisher"));
                    jo.put("is_spoiler", resultSet.getBoolean("publisher"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
        });

        get("/getUser", "application/json", (req,res)->{
            setHeaders(res);

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            String username = req.queryParams("username");

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getUser.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setString(1, username);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("username", resultSet.getString("username"));
                    jo.put("password_hash", resultSet.getString("password_hash"));
                    jo.put("email", resultSet.getString("email"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
        });

        get("/getUserAchievements", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");
            int gameId = Integer.parseInt(req.queryParams("gameId"));

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getUserAchievements.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setString(1, username);
                preparedStatement.setInt(2, gameId);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("achievement_number", resultSet.getInt("achievement_number"));
                    jo.put("game_id", resultSet.getInt("game_id"));
                    jo.put("name", resultSet.getString("name"));
                    jo.put("description", resultSet.getString("description"));
                    jo.put("score", resultSet.getInt("score"));
                    jo.put("is_spoiler", resultSet.getBoolean("is_spoiler"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
        });

        get("/updateUserAchievementState", "application/json", (req,res)->{
            setHeaders(res);

            // Authorize
            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            }

            // Get query parameters
            String username = req.queryParams("username");
            int achievement = Integer.parseInt(req.queryParams("achievement"));

            // Objects used in querying
            String rawStatement;

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/updateUserAchievementState.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);

                preparedStatement.setString(1, username);
                preparedStatement.setInt(2, achievement);
                preparedStatement.executeQuery();


                res.status(200);
                return null;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
        });

        get("/getUserTimelineEntries", "application/json", (req,res)->{
            setHeaders(res);

            if (!checkAuth(req.headers("Authorization"))){
                res.status(401);
                return null;
            };

            String username = req.queryParams("username");

            // Objects used in querying
            String rawStatement;
            JSONObject returnObject = new JSONObject();

            // Execute query
            try(FileInputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/" + "sql/getUserTimelineEntries.sql")) {
                // Get raw statements (still has ?'s in it)
                rawStatement = IOUtils.toString(inputStream);

                // Turn into and execute prepared statement
                PreparedStatement preparedStatement;
                preparedStatement = getConnection().prepareStatement(rawStatement);
                preparedStatement.setString(1, username);
                ResultSet resultSet = preparedStatement.executeQuery();

                // Massage data into JSON format
                ArrayList<JSONObject> returnArray = new ArrayList<>();
                while( resultSet.next() ){
                    JSONObject jo = new JSONObject();
                    jo.put("username", resultSet.getString("username"));
                    jo.put("datetime", resultSet.getDate("datetime"));
                    jo.put("game_id", resultSet.getInt("game_id"));
                    jo.put("achievement_number", resultSet.getInt("achievement_number"));
                    jo.put("name", resultSet.getString("name"));
                    returnArray.add(jo);
                }

                // Return data
                returnObject.put("data", returnArray);
                res.status(200);
                return returnObject;
            } catch (Exception e){
                // Uh oh
                res.status(500);
                return e.toString();
            }
        });
    }
}
