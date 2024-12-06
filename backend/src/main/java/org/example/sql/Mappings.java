package org.example.sql;

import java.util.HashMap;

public class Mappings {
    public static final HashMap<String, String> GAME_MAPPINGS = new HashMap<>();
    public static final HashMap<String, String> COMPLETION_MAPPINGS = new HashMap<>();
    public static final HashMap<String, String> COMPLETION_CATEGORY_MAPPINGS = new HashMap<>();
    public static final HashMap<String, String> ACHIEVEMENT_MAPPINGS = new HashMap<>();
    public static final HashMap<String, String> USER_MAPPINGS = new HashMap<>();
    public static final HashMap<String, String> GAME_REVIEW_MAPPINGS = new HashMap<>();
    public static final HashMap<String, String> TASK_MAPPINGS = new HashMap<>();
    public static final HashMap<String, String> TODO_MAPPINGS = new HashMap<>();

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

        ACHIEVEMENT_MAPPINGS.put("achievement_number", "identifier");
        ACHIEVEMENT_MAPPINGS.put("game_id", "game_id");
        ACHIEVEMENT_MAPPINGS.put("name", "name");
        ACHIEVEMENT_MAPPINGS.put("description", "description");
        ACHIEVEMENT_MAPPINGS.put("is_spoiler", "is_spoiler");
        ACHIEVEMENT_MAPPINGS.put("score", "score");

        USER_MAPPINGS.put("username", "username");
        USER_MAPPINGS.put("email", "email");
        USER_MAPPINGS.put("member_since", "member_since");
        USER_MAPPINGS.put("user_type", "type");

        GAME_REVIEW_MAPPINGS.put("text", "text");
        GAME_REVIEW_MAPPINGS.put("rating", "rating");

        TASK_MAPPINGS.put("name", "name");
        TASK_MAPPINGS.put("description", "description");
        TASK_MAPPINGS.put("is_complete", "complete");

        TODO_MAPPINGS.put("list_name", "name");
    }
}
