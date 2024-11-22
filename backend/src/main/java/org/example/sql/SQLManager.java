package org.example.sql;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.utils.IOUtils;

import java.io.FileInputStream;
import java.sql.*;
import java.util.HashMap;
import java.util.Optional;

public class SQLManager {
    private static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");

        return DriverManager.getConnection(
                "jdbc:mysql://127.0.0.1:3306/goal?allowPublicKeyRetrieval=true&useSSL=false",
                "username",
                "password"
        );
    }

    public static JSONArray mapResults(ResultSet result, HashMap<String, String> databaseToAPIMap) {
        JSONArray array = new JSONArray();
        while(true) {
            try {
                if (!result.next()) break;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

            JSONObject object = new JSONObject();
            for (String databaseKey : databaseToAPIMap.keySet()) {
                try {
                    try {
                        object.put(databaseToAPIMap.get(databaseKey), result.getString(databaseKey));
                    } catch (SQLException e) {
                        object.putOpt(databaseToAPIMap.get(databaseKey), null);
                    }
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
            array.put(object);
        }
        return array;
    }

    public static JSONArray mapResults(ResultSet result, String attribute) {
        JSONArray array = new JSONArray();
        while(true) {
            try {
                if (!result.next()) break;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

            try {
                array.put(result.getString(attribute));
            } catch (SQLException ignored) {}
        }
        return array;
    }

    public static JSONObject mapResult(ResultSet result, HashMap<String, String> databaseToAPIMap) {
        try {
            if (!result.next()) return null;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        JSONObject object = new JSONObject();
        for (String databaseKey : databaseToAPIMap.keySet()) {
            try {
                try {
                    object.put(databaseToAPIMap.get(databaseKey), result.getString(databaseKey));
                } catch (SQLException e) {
                    object.putOpt(databaseToAPIMap.get(databaseKey), null);
                }
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
        }
        return object;
    }

    public static Optional<ResultSet> fetchFromDatabase(String queryFile, String... parameters) {
        try(FileInputStream inputStream = new FileInputStream( "sql/" + queryFile + ".sql")) {
            // Get raw statements (still has ?'s in it)
            String rawStatement = IOUtils.toString(inputStream);

            System.out.println(rawStatement);

            // Turn into and execute prepared statement
            PreparedStatement preparedStatement = getConnection().prepareStatement(rawStatement);
            for(int i = 0; i < parameters.length; i++) {
                preparedStatement.setString(i+1, parameters[i]);
            }
            ResultSet resultSet = preparedStatement.executeQuery();
            return Optional.of(resultSet);
        } catch(Exception e) {
            return Optional.empty();
        }
    }

    public static boolean postToDatabase(String queryFile, String... parameters) {
        try(FileInputStream inputStream = new FileInputStream( "sql/" + queryFile + ".sql")) {
            // Get raw statements (still has ?'s in it)
            String rawStatement = IOUtils.toString(inputStream);

            System.out.println(rawStatement);

            // Turn into and execute prepared statement
            PreparedStatement preparedStatement = getConnection().prepareStatement(rawStatement);
            for(int i = 0; i < parameters.length; i++) {
                preparedStatement.setString(i+1, parameters[i]);
            }
            System.out.println(preparedStatement);
            System.out.println(preparedStatement.executeUpdate());
            getConnection().commit();
            return true;
        } catch(Exception ignored) {
            return false;
        }
    }
}
