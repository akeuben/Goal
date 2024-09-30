package org.example;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class User extends ApiReturn {
    User(
            String user,
            ArrayList<JSONObject> achievements,
            ArrayList<JSONObject> games
    ) throws JSONException {
        this.jo.put("user", user);
        this.jo.put("achievements", achievements);
        this.jo.put("games", games);
    }
}