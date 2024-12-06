package org.example.requests;

import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Spark;

public abstract class AbstractRequest {
    public void register(String apiPath) {
        Spark.get(apiPath, this::initialHandleRequest);
        Spark.options(apiPath, ((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Authorization, *");
            return true;
        }));
    }

    protected static boolean checkAuthentication(String token) {
        return true;
    }

    private Object initialHandleRequest(Request request, Response response) {
        response.header("Access-Control-Allow-Origin", "*");
        try {
            return handleRequest(request, response);
        } catch(Exception e) {
            response.status(500);
            e.printStackTrace();
            return "Internal server error: " + e.getLocalizedMessage();
        }
    }

    protected abstract Object handleRequest(Request request, Response response) throws JSONException;
}
