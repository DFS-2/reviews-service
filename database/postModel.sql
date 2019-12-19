DROP DATABASE IF EXISTS reviewmodule;

CREATE DATABASE reviewmodule;

\c reviewmodule

CREATE TABLE users (
    userId          int,
    name            varchar(100),
    image           varchar(150),
    PRIMARY KEY     (userId)
);

CREATE TABLE hosts (
    hostId          int,
    hostName        varchar(100),
    hostImage       varchar(150),
    PRIMARY KEY     (hostId)
);

CREATE TABLE reviews (
    reviewId        int,
    userId          int REFERENCES users(userId),
    date            date,
    body            varchar(5000),
    rating          smallint,
    cleanliness     smallint,
    communication   smallint,
    checkin         smallint,
    accuracy        smallint,
    location        smallint,
    value           smallint,
    quiRes          boolean,
    outHos          boolean,
    amaAme          boolean,
    stySpa          boolean,
    spaCle          boolean,
    hostId          int REFERENCES hosts(hostId),
    PRIMARY KEY     (reviewId)
);