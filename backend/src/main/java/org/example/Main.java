package org.example;

//https://www.boxuk.com/insight/creating-a-rest-api-quickly-using-pure-java/
//https://www.baeldung.com/spark-framework-rest-api
//https://www.youtube.com/watch?v=9ntKSLLDeSs

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        get("/hello", (req, res)->"Hello, world");

        get("/hello/:name", (req,res)->{
            return "Hellon't, "+ req.params(":name");
        });

        get("/test", (req, res)->{
            String returnString = "";

            try{
                Class.forName("com.mysql.jdbc.Driver");

                Connection connection = DriverManager.getConnection(
                        "jdbc:mysql://127.0.0.1:3306/login_schema?useSSL=false",
                        "read",
                        "cpsc471!"
                );

                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM USERS");

                while( resultSet.next() ){
                    String username = resultSet.getString("username");
                    String password = resultSet.getString("password");

                    returnString += username + " ";

                    System.out.println(username);
                    System.out.println(password);
                }

                return returnString;
            } catch (Exception e){
                return e.toString();
            }
        });
    }
}