# reviews-module

1. start with "npm install"
2. set up database with "npm run db:setup"
3. create data with "npm run create:csv"
4. seed database with "npm run seed:post"
5. bundle using "npm run build:production"
6. run server with "npm run server:production"

enjoy!

# CRUD API
 Create / POST:   "/api/reviews/:hostId"  
 Read / GET:      "/api/reviews/:hostId"  
 Update / PUT:    "/api/reviews/:hostId"  
 Delete / DELETE: "/api/reviews/:hostId"  

 # Postgres Database and Table Set-Up
 run in command line from root directory:   
 "sudo -u Strider psql -d postgres -f /Users/Strider/hackreactor/reviews-module/database/postModel.sql"