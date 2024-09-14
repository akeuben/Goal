package org.example;

//https://www.boxuk.com/insight/creating-a-rest-api-quickly-using-pure-java/
//https://www.baeldung.com/spark-framework-rest-api
//https://www.youtube.com/watch?v=9ntKSLLDeSs

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello, world");

        get("/hello/:name", (req, res) -> {
            return "Hellon't, " + req.params(":name");
        });

        get("/json", (req, res) -> {
            HashMap<String, Double> arrayList = new HashMap<>();
            arrayList.put("Test", 5.0);
            arrayList.put("Test1", -5.0);
            arrayList.put("Test2", 65.0);
            return arrayList;
        });

        get("/sql", (req, res) -> {
            String returnString = "";

            try {
                Class.forName("com.mysql.jdbc.Driver");

                // This connection will suffice to access the database for reading, writing,
                // etc.
                Connection connection = DriverManager.getConnection(
                        "jdbc:mysql://127.0.0.1:3306/login_schema?allowPublicKeyRetrieval=true&useSSL=false",
                        "root", // Your name for root of MySQL
                        "471Cpsc2024?"// Your password for root of MySQL
                );

                // The following to print the username from the table has no relation to
                // connecting with the database. It is simply just data.
                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM USERS");

                while (resultSet.next()) {
                    String username = resultSet.getString("username");
                    String password = resultSet.getString("password");

                    returnString += username + ":when connected to root ";

                    System.out.println(username);
                    System.out.println(password);
                }

                // If we want to limit access in certain cases by connecting to the server with
                // another user when permissions are set
                // we can use the following to create a new user that can access the database
                // with set permissions (Only possible when connected with root user)
                try {
                    // Create a new user (readonly is the username and readonlypass is the password)
                    PreparedStatement create = connection
                            .prepareStatement(
                                    "CREATE USER IF NOT EXISTS 'readonly'@'localhost' IDENTIFIED BY 'readonlypass'");
                    create.executeUpdate();

                    // Choose the permissions to set with this line
                    PreparedStatement readOnlyPermission = connection
                            .prepareStatement("GRANT SELECT ON *.* TO readonly@localhost"); // Set to Read only
                    readOnlyPermission.executeUpdate();

                } catch (Exception e) {
                    System.out.println(e);
                }

                // Set the connection to the new user. In this case the read only user
                connection = DriverManager.getConnection(
                        "jdbc:mysql://127.0.0.1:3306/login_schema?allowPublicKeyRetrieval=true&useSSL=false",
                        "readonly", // Username for the read only user
                        "readonlypass");// Password for the read only user

                Statement statementRO = connection.createStatement();
                ResultSet resultSetRO = statementRO.executeQuery("SELECT * FROM USERS");

                while (resultSetRO.next()) {
                    String username = resultSetRO.getString("username");
                    String password = resultSetRO.getString("password");

                    returnString += username + ":when connected to readonly ";

                    System.out.println(username);
                    System.out.println(password);
                }

                // The below will fail because
                // readonly user can only read and cannot edit the table
                try{
                    PreparedStatement insert = connection
                            .prepareStatement("INSERT INTO users(username, password) VALUES(?,?)");
                    insert.setString(1, "readonly");
                    insert.setString(2, "readonlypass");
                    insert.executeUpdate();
                }catch(Exception e){
                    System.out.println("Read only user attempted to edit " + e);
                }
                return returnString;
            } catch (Exception e) {
                return e.toString();
            }
        });
    }
}