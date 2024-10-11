package org.example;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class User extends ApiReturn {
    User(
            String user,
            String email,
            String password
    ) throws JSONException {
        this.jo.put("username", user);
        this.jo.put("email", email);
        this.jo.put("password", password);
    }
}