
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TYPE "gender_type" AS enum ('male', 'female');

CREATE TYPE "customer_category" AS enum ('gold', 'frequent', 'new');

CREATE TYPE "shedule_state" AS enum('on_time', 'delay', 'cancelled');


CREATE TABLE "customer" (
  "customer_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "email" varchar(50) NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "gender" gender_type NOT NULL,
  "birthday" date NOT NULL,
  "NIC" varchar(15) NOT NULL,
  "category" customer_category NOT NULL DEFAULT 'frequent',
  PRIMARY KEY ("customer_id"),
  UNIQUE ("NIC", "email")
);

CREATE TABLE "customer_login" (
  "password" varchar(255) NOT NULL,
  "customer_id" uuid NOT NULL,
  PRIMARY KEY ("customer_id"),
  FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id")
);

CREATE TABLE "management" (
  "management_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "username" varchar(50) NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "NIC" varchar(20) NOT NULL,
  "email" varchar(100) NOT NULL,
  PRIMARY KEY ("management_id"),
  UNIQUE ("username", "NIC", "email")
);

CREATE TABLE "management_login" (
  "management_id" uuid NOT NULL,
  "password" varchar(255) NOT NULL,
  FOREIGN KEY ("management_id") REFERENCES "management" ("management_id"),
  UNIQUE ("management_id")
);

CREATE TABLE "staff" (
  "staff_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "NIC" varchar(15) NOT NULL,
  "country" varchar(100) NOT NULL,
  PRIMARY KEY ("staff_id"),
  UNIQUE ("NIC")
);

CREATE TABLE "aircraft_model" (
  "model_id" serial NOT NULL,
  "model" varchar(50) NOT NULL,
  "brand" varchar(50) NOT NULL,
  PRIMARY KEY ("model_id")
);

CREATE TABLE "class" (
  "class_id" serial NOT NULL,
  "name" varchar(100) NOT NULL,
  PRIMARY KEY ("class_id")
);

CREATE TABLE "location" (
  "location_id" serial NOT NULL,
  "name" varchar(200) NOT NULL,
  PRIMARY KEY ("location_id")
);

CREATE TABLE "parent_location" (
  "parent_location" int NOT NULL,
  "child_location" int NOT NULL,
  FOREIGN KEY ("parent_location") REFERENCES "location" ("location_id"),
  FOREIGN KEY ("child_location") REFERENCES "location" ("location_id")
);

CREATE TABLE "aircraft" (
  "aircraft_id" serial,
  "model_id" int NOT NULL,
  PRIMARY KEY ("aircraft_id"),
  FOREIGN KEY ("model_id") REFERENCES "aircraft_model" ("model_id")
);

CREATE TABLE "airport" (
  "short_code" varchar(10) NOT NULL,
  "country" varchar(100) NOT NULL,
  "name" varchar(200) NOT NULL,
  "location_id" int NOT NULL,
  PRIMARY KEY ("short_code"),
  FOREIGN KEY ("location_id") REFERENCES "location" ("location_id")
);

CREATE TABLE "route" (
  "route_id" serial NOT NULL,
  "origin_id" varchar(10) NOT NULL,
  "destination_id" varchar(10) NOT NULL,
  PRIMARY KEY ("route_id"),
  FOREIGN KEY ("origin_id") REFERENCES "airport" ("short_code"),
  FOREIGN KEY ("destination_id") REFERENCES "airport" ("short_code")
);

CREATE TABLE "flight" (
  "flight_id" serial NOT NULL,
  "active_status" boolean NOT NULL,
  "arrival_time" time NOT NULL,
  "departure_time" time NOT NULL,
  "route_id" int NOT NULL,
  "aircraft_id" int NOT NULL,
  PRIMARY KEY ("flight_id"),
  FOREIGN KEY ("aircraft_id") REFERENCES "aircraft" ("aircraft_id"),
  FOREIGN KEY ("route_id") REFERENCES "route" ("route_id")
);

CREATE TABLE "passenger" (
  "passenger_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "gender" gender_type NOT NULL,
  "birthday" date NOT NULL,
  "passport_no" varchar(20) NOT NULL,
  "email" varchar(100) NOT NULL,
  PRIMARY KEY ("passenger_id"),
  UNIQUE ("passport_no", "email")
);

CREATE TABLE "price" (
  "class_id" int NOT NULL,
  "amount" decimal(10, 2) NOT NULL,
  "route_id" int NOT NULL,
  PRIMARY KEY ("class_id", "route_id"),
  FOREIGN KEY ("class_id") REFERENCES "class" ("class_id"),
  FOREIGN KEY ("route_id") REFERENCES "route" ("route_id")
);

CREATE TABLE "schedule" (
  "schedule_id" serial NOT NULL,
  "date" date NOT NULL,
  "arrival_time_delay" time NOT NULL,
  "departure_time_delay" time NOT NULL,
  "flight_id" int NOT NULL,
  "state" shedule_state NOT NULL,
  PRIMARY KEY ("schedule_id"),
  FOREIGN KEY ("flight_id") REFERENCES "flight" ("flight_id")
);

CREATE TABLE "seat" (
  "seat_id" serial NOT NULL,
  "aircraft_model" int NOT NULL,
  "class_id" int NOT NULL,
  "row" smallint NOT NULL,
  "column" smallint NOT NULL,
  PRIMARY KEY ("seat_id"),
  FOREIGN KEY ("aircraft_model") REFERENCES "aircraft" ("aircraft_id"),
  FOREIGN KEY ("class_id") REFERENCES "class" ("class_id")
);

CREATE TABLE "booking" (
  "booking_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "booked_date" date NOT NULL,
  "customer_id" uuid NOT NULL,
  PRIMARY KEY ("booking_id"),
  FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id")
);

CREATE TABLE "ticket" (
  "ticket_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "passenger_id" uuid NOT NULL,
  "seat_id" int NOT NULL,
  "flight_id" int NOT NULL,
  "date" date NOT NULL,
  "booking_id" uuid NOT NULL,
  PRIMARY KEY ("ticket_id"),
  FOREIGN KEY ("passenger_id") REFERENCES "passenger" ("passenger_id"),
  FOREIGN KEY ("seat_id") REFERENCES "seat" ("seat_id"),
  FOREIGN KEY ("flight_id") REFERENCES "flight" ("flight_id"),
  FOREIGN KEY ("booking_id") REFERENCES "booking" ("booking_id")
);
