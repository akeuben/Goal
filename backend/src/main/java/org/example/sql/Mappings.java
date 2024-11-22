package org.example.sql;

import java.util.HashMap;

public class Mappings {
    public static HashMap<String, String> GAME_MAPPINGS = new HashMap<>();
    public static HashMap<String, String> COMPLETION_MAPPINGS = new HashMap<>();
    public static HashMap<String, String> COMPLETION_CATEGORY_MAPPINGS = new HashMap<>();

    static {
        GAME_MAPPINGS.put("game_id", "identifier");
        GAME_MAPPINGS.put("name", "name");
        GAME_MAPPINGS.put("description", "description");
        GAME_MAPPINGS.put("release_year", "releaseYear");
        GAME_MAPPINGS.put("publisher", "publisher");

        COMPLETION_MAPPINGS.put("username", "user");
        COMPLETION_MAPPINGS.put("status", "status");
        COMPLETION_MAPPINGS.put("game_id", "game_id");

        COMPLETION_CATEGORY_MAPPINGS.put("username", "user");
        COMPLETION_CATEGORY_MAPPINGS.put("name", "name");
        COMPLETION_CATEGORY_MAPPINGS.put("colour", "colour");
        COMPLETION_CATEGORY_MAPPINGS.put("ordering", "order");
    }
}
