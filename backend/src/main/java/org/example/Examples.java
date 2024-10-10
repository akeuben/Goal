package org.example;

import org.json.JSONException;

public class Examples {

    public static Game game_sc2() throws JSONException {
        return new Game(
                "aleksSecondFavoriteGame",
                "Starcraft 2",
                2016,
                "Iron Galaxy",
                "Blizzard Entertainment",
                "Overwatch was a 2016 team-based multiplayer first-person shooter game by Blizzard " +
                        "Entertainment."
        );
    }

    public static Game game_ow() throws JSONException {
        return new Game(
                "aleksIsSadTheyKilledIt",
                "Overwatch",
                2010,
                "Blizzard",
                "Blizzard Entertainment",
                "Set in the future, the game centers on a galactic struggle for dominance among the " +
                        "various fictional races of StarCraft."
        );
    }

    public static GameCompletionCategory game_completion_category_1(String username) throws JSONException{
        return new GameCompletionCategory(
                username,
                "myStatus",
                "red",
                1);
    }

    public static GameCompletionCategory game_completion_category_2(String username) throws JSONException{
        return new GameCompletionCategory(
                username,
                "myStatus2",
                "blue",
                8);
    }

    public static GameCompletion game_completion_sc2(String username) throws JSONException {
        return new GameCompletion(
                Examples.game_sc2(),
                Examples.user(),
                "",
                Examples.game_completion_category_1(username)
        );
    }

    public static GameCompletion game_completion_ow(String username) throws JSONException {
        return new GameCompletion(
                Examples.game_ow(),
                Examples.user(),
                "Died",
                Examples.game_completion_category_2(username)
        );
    }

    public static Achievement achievement_ow() throws JSONException {
        return new Achievement(
                5,
                Examples.game_ow(),
                "Start",
                "Open the game",
                true,
                -1
        );
    }

    public static Achievement achievement_sc2() throws JSONException {
        return new Achievement(
                6,
                Examples.game_sc2(),
                "Close The Game",
                "Realize this game has died",
                false,
                5
        );
    }

    public static User user() throws JSONException {
        return new User(
                "test",
                "test@ucalgary.ca",
                "8A6BE599"
        );
    }

    public static TimelineEntry timelineEntry_1() throws JSONException {
        return new TimelineEntry(
                Examples.user(),
                "2024-12-25 18:00:37",
                Examples.achievement_ow()
        );
    }

    public static TimelineEntry timelineEntry_2() throws JSONException {
        return new TimelineEntry(
                Examples.user(),
                "2023-01-05 08:10:07",
                Examples.game_completion_ow("test")
        );
    }
}
