This is a template that can be used to connect to the data base. In the code, I am using my root user for the initial connection so I can create and set permissions with new users with a MySQL database (Probably not necessary for our case, but I put it there just in case). 

If we do not need to create new users, line 43 can be a pre created user that has access to the database along with its password in line 44. 

Line 41- Line 45 is the code that initiates the connection. It will fail if the username or password is incorrect (Not recognized by your MySQL). The rest of the code in the first try statement is optional and just there to ensure everything works as expected.

The schema will change from login_schema to whatever we choose to name our schema.

To test it out you have to change the username to **your** MySQL username and password.
