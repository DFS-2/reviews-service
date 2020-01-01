DROP DATABASE IF EXISTS reviewmodule;

CREATE DATABASE reviewmodule;

\c reviewmodule

CREATE TABLE users (
    userId          SERIAL,
    name            varchar(30),
    image           varchar(90),
    PRIMARY KEY     (userId)
);

CREATE TABLE hosts (
    hostId          SERIAL,
    hostName        varchar(30),
    hostImage       varchar(90),
    PRIMARY KEY     (hostId)
);

CREATE TABLE reviews (
    reviewId        SERIAL,
    userId          int REFERENCES users(userId),
    date            varchar(150),
    body            varchar(800),
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
    hostRes         varchar(800),
    hostResDate     varchar(150),
    PRIMARY KEY     (reviewId)
);

-- REFERENCES users(userId)
-- REFERENCES hosts(hostId)