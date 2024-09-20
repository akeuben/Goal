package org.example;

import org.json.JSONObject;

import java.util.HashMap;

public class ApiReturn {
    protected JSONObject jo = new JSONObject();

    public JSONObject toReturn(){
        return this.jo;
    }
}
