package org.example;

//https://www.boxuk.com/insight/creating-a-rest-api-quickly-using-pure-java/
//https://www.baeldung.com/spark-framework-rest-api
//https://www.youtube.com/watch?v=9ntKSLLDeSs

import org.example.requests.*;
import spark.Response;
import spark.Spark;

import java.sql.*;

public class Main {

    private static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");

        Connection connection = DriverManager.getConnection(
                "jdbc:mysql://127.0.0.1:3306/goal?allowPublicKeyRetrieval=true&useSSL=false",
                "username",
                "password"
        );

        return connection;
    }

    private static boolean checkAuth(String token){
        return true;
        // Objects used in querying
        /*String rawStatement;
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
        }*/
    }
    
    private static void setHeaders(Response res) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    }

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
    }
}
