package org.example.requests;

import org.example.sql.Mappings;
import org.example.sql.SQLManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;

import java.sql.ResultSet;
import java.util.Optional;

public class GetGamesByDeveloper extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String developer = request.queryParams("developer");
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getGamesByDeveloper", developer);

        if(result.isEmpty()) {
            System.out.println("Initial result is empty");
            throw new RuntimeException("Internal Database Error.");
        }

        JSONArray array = SQLManager.mapResults(result.get(), Mappings.GAME_MAPPINGS);
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
