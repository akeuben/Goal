package org.example;

import org.json.JSONException;

public class Game extends ApiReturn {
    Game(
            String identifier,
            String name,
            int releaseYear,
            String developer,
            String publisher,
            String description
    ) throws JSONException {
        this.jo.put("identifier", identifier);
        this.jo.put("name", name);
        this.jo.put("releaseYear", releaseYear);
        this.jo.put("developer", developer);
        this.jo.put("publisher", publisher);
        this.jo.put("description", description);
    }
}