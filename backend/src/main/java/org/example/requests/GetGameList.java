package org.example.requests;

import org.example.sql.Game;
import org.json.JSONException;
import spark.Request;
import spark.Response;

import java.util.Objects;

public class GetGameList extends AbstractRequest {
    @Override
    protected Object handleRequest(Request request, Response response) throws JSONException {
        String search = "%" + request.queryParams("search") + "%";

        String sortBy = request.queryParams("sortBy");

        if(Objects.equals(sortBy, "release")) {
            sortBy = "g.release_year";
        } else {
            sortBy = "g.name";
        }

        System.out.println(search);

        String sortAscending = request.queryParams("sortAscending");

        System.out.println("By " + sortBy + ", asc " + sortAscending);

        return Game.fetchGames(search, sortBy, sortAscending.equals("true"));
    }
}
