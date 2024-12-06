package org.example.sql;

import spark.Request;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Optional;

public class Auth {

    static MessageDigest digest;

    static {
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getPasswordHash(String password) {
        byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
        return new String(Base64.getEncoder().encode(hash));
    }

    public static boolean checkPasswordHash(String password, String expectedHash) {
        String hash = getPasswordHash(password);
        return hash.equals(expectedHash);
    }

    public static String getExpectedHash(String username) {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getUser", username);
        if(result.isEmpty()) {
            throw new RuntimeException("Failed to fetch user password hash");
        }

        return SQLManager.mapResultString(result.get(), "password_hash");
    }

    public static Session getSession(String token) throws SQLException {
        Optional<ResultSet> result = SQLManager.fetchFromDatabase("getUserSession", token);

        if(result.isEmpty()) {
            return null;
        }

        result.get().next();
        String username = result.get().getString("username");
        String userType = result.get().getString("user_type");

        return new Session(username, token, userType);
    }

    public static boolean simpleAuthCheck(Request request, String requiredUsername, boolean canBePlayer, boolean canBeDeveloper) {
        String token;
        try {
            System.out.println(request.headers("Authorization").split(" ")[1]);
            token = request.headers("Authorization").split(" ")[1];
        } catch (Exception ignored) {
            return false;
        }

        Session userSession;
        try {
            userSession = getSession(token);
        } catch (SQLException e) {
            return false;
        }

        assert userSession != null;

        if(!canBePlayer && userSession.userType().equals("player")) {
            return false;
        }

        if(!canBeDeveloper && userSession.userType().equals("developer")) {
            return false;
        }

        return requiredUsername.equals(userSession.username());
    }
}
