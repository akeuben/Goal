package org.example.sql;

public class Timeline {
    public static void postAchievementTimelineEntry(String username, String achievement) {
        if(!SQLManager.postToDatabase("addAchievementTimelineEntry", username, achievement)) {
            throw new RuntimeException("Failed to add timeline entry!");
        }
    }

    public static void postGameTimelineEntry(String username, String game, String status) {
        if(!SQLManager.postToDatabase("addGameBuiltinTimelineEntry", username, game, status)) {
            throw new RuntimeException("Failed to add timeline entry!");
        }
    }

    public static void postCustomGameTimelineEntry(String username, String game, String name) {
        if(!SQLManager.postToDatabase("addGameCustomTimelineEntry", username, game, name)) {
            throw new RuntimeException("Failed to add timeline entry!");
        }
    }
}
