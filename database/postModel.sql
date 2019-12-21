DROP DATABASE IF EXISTS reviewmodule;

CREATE DATABASE reviewmodule;

\c reviewmodule

CREATE TABLE users (
    userId          SERIAL,
    name            varchar(100),
    image           varchar(150),
    PRIMARY KEY     (userId)
);

CREATE TABLE hosts (
    hostId          SERIAL,
    hostName        varchar(100),
    hostImage       varchar(150),
    PRIMARY KEY     (hostId)
);

CREATE TABLE reviews (
    reviewId        SERIAL,
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
    hostRes         varchar(5000),
    hostResDate     date,
    PRIMARY KEY     (reviewId)
);