package org.example.sql;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.util.Optional;

public class Todo {

    public static JSONObject getTodoList(String username, String game, String list) throws JSONException {
        JSONObject l = new JSONObject();
        l.put("name", list);
        l.put("user", User.fetchUser(username));
        l.put("game", Game.fetchGame(game));
        l.put("entries", getTasksForList(username, game, list));

        return l;
    }

    public static JSONArray getTodoLists(String username, String game) throws JSONException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getLists", username, game);

        if(result.isEmpty()) {
            System.out.println("Initial result is empty");
            throw new RuntimeException("Internal Database Error.");
        }

        JSONArray array = SQLManager.mapResults(result.get(), Mappings.TODO_MAPPINGS);

        for(int i = 0; i < array.length(); i++) {
            JSONObject l = array.getJSONObject(i);
            l.put("user", User.fetchUser(username));
            l.put("game", Game.fetchGame(game));
            l.put("entries", getTasksForList(username, game, l.getString("name")));
        }

        return array;
    }

    public static JSONArray getTasksForList(String username, String game, String list) {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getListItems", username, game, list);

        if(result.isEmpty()) {
            System.out.println("Initial result is empty");
            throw new RuntimeException("Internal Database Error.");
        }

        return SQLManager.mapResults(result.get(), Mappings.TASK_MAPPINGS);
    }

    public static JSONObject getTaskForList(String username, String game, String list, String entry) {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getListItem", username, game, list, entry);

        if(result.isEmpty()) {
            System.out.println("Initial result is empty");
            throw new RuntimeException("Internal Database Error.");
        }

        return SQLManager.mapResult(result.get(), Mappings.TASK_MAPPINGS);
    }
}
