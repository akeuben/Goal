package org.example.sql;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.utils.IOUtils;

import java.io.FileInputStream;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Optional;

public class Game {
    public static JSONObject fetchGame(String identifier) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGame", identifier);

        if(result.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        JSONObject object = SQLManager.mapResult(result.get(), Mappings.GAME_MAPPINGS);

        Optional<ResultSet> developers = SQLManager.fetchFromDatabase("getGameDevelopers", identifier);

        if(developers.isEmpty()) {
            throw new RuntimeException("Internal Database Error.");
        }

        object.put("developers", SQLManager.mapResults(developers.get(), "username"));

        return object;
    }

    public static JSONArray fetchGames(String search, String by, boolean ascending) throws JSONException {
        ResultSet result;
        try(FileInputStream inputStream = new FileInputStream( "sql/getGameList.sql")) {
            // Get raw statements (still has ?'s in it)
            String rawStatement = IOUtils.toString(inputStream);
            rawStatement = rawStatement.replaceAll("%col%", by).replaceAll("%asc%", ascending ? "ASC" : "DESC");

            System.out.println(rawStatement);

            // Turn into and execute prepared statement
            PreparedStatement preparedStatement = SQLManager.getConnection().prepareStatement(rawStatement);
            preparedStatement.setString(1, search);
            result = preparedStatement.executeQuery();
        } catch(Exception e) {
            throw new RuntimeException("Failed to fetch games list");
        }

        JSONArray array = SQLManager.mapResults(result, Mappings.GAME_MAPPINGS);
        for(int i = 0; i < array.length(); i++) {
            JSONObject object = array.getJSONObject(i);
            Optional<ResultSet> developers = SQLManager.fetchFromDatabase("getGameDevelopers", object.getString("identifier"));

            if (developers.isEmpty()) {
                System.out.println("Developer result is empty");
                throw new RuntimeException("Internal Database Error.");
            }

            object.put("developers", SQLManager.mapResults(developers.get(), "username"));
        }

        return array;
    }
}
