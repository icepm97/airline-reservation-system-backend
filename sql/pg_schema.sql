-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION rjxpoyjijcqoyl;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP TYPE customer_category;

CREATE TYPE customer_category AS ENUM (
	'gold',
	'frequent',
	'new',
	'guest');

-- DROP TYPE gender_type;

CREATE TYPE gender_type AS ENUM (
	'male',
	'female');

-- DROP TYPE shedule_state;

CREATE TYPE shedule_state AS ENUM (
	'on_time',
	'delay',
	'cancelled');

-- DROP SEQUENCE public.aircraft_aircraft_id_seq;

CREATE SEQUENCE public.aircraft_aircraft_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.aircraft_model_model_id_seq;

CREATE SEQUENCE public.aircraft_model_model_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 3
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.class_class_id_seq;

CREATE SEQUENCE public.class_class_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 3
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.flight_flight_id_seq;

CREATE SEQUENCE public.flight_flight_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 9
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.location_location_id_seq;

CREATE SEQUENCE public.location_location_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 3
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.route_route_id_seq;

CREATE SEQUENCE public.route_route_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 4
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.schedule_schedule_id_seq;

CREATE SEQUENCE public.schedule_schedule_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 61
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.seat_seat_id_seq;

CREATE SEQUENCE public.seat_seat_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 178
	CACHE 1
	NO CYCLE;
-- Drop table

-- DROP TABLE public.aircraft_model;

CREATE TABLE public.aircraft_model (
	model_id serial NOT NULL,
	model varchar(50) NOT NULL,
	brand varchar(50) NOT NULL,
	CONSTRAINT aircraft_model_pkey PRIMARY KEY (model_id)
);

-- Drop table

-- DROP TABLE public."class";

CREATE TABLE public."class" (
	class_id serial NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT class_pkey PRIMARY KEY (class_id)
);

-- Drop table

-- DROP TABLE public.customer;

CREATE TABLE public.customer (
	customer_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	email varchar(50) NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	gender gender_type NOT NULL,
	birthday date NOT NULL,
	"NIC" varchar(15) NOT NULL,
	category customer_category NOT NULL DEFAULT 'new'::customer_category,
	country varchar(50) NULL,
	CONSTRAINT "customer_NIC_key" UNIQUE ("NIC"),
	CONSTRAINT customer_email_key UNIQUE (email),
	CONSTRAINT customer_pkey PRIMARY KEY (customer_id)
);

-- Drop table

-- DROP TABLE public."location";

CREATE TABLE public."location" (
	location_id serial NOT NULL,
	"name" varchar(200) NOT NULL,
	CONSTRAINT location_pkey PRIMARY KEY (location_id)
);

-- Drop table

-- DROP TABLE public.management;

CREATE TABLE public.management (
	management_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar(50) NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	"NIC" varchar(20) NOT NULL,
	email varchar(100) NOT NULL,
	CONSTRAINT "management_NIC_key" UNIQUE ("NIC"),
	CONSTRAINT management_email_key UNIQUE (email),
	CONSTRAINT management_pkey PRIMARY KEY (management_id),
	CONSTRAINT management_username_key UNIQUE (username)
);

-- Drop table

-- DROP TABLE public.passenger;

CREATE TABLE public.passenger (
	passenger_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	gender gender_type NOT NULL,
	birthday date NOT NULL,
	passport_no varchar(20) NOT NULL,
	email varchar(100) NOT NULL,
	country varchar(50) NULL,
	CONSTRAINT passenger_passport_no_key UNIQUE (passport_no),
	CONSTRAINT passenger_pkey PRIMARY KEY (passenger_id)
);

-- Drop table

-- DROP TABLE public.staff;

CREATE TABLE public.staff (
	staff_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	"NIC" varchar(15) NOT NULL,
	country varchar(100) NOT NULL,
	CONSTRAINT "staff_NIC_key" UNIQUE ("NIC"),
	CONSTRAINT staff_pkey PRIMARY KEY (staff_id)
);

-- Drop table

-- DROP TABLE public.aircraft;

CREATE TABLE public.aircraft (
	aircraft_id serial NOT NULL,
	model_id int4 NOT NULL,
	CONSTRAINT aircraft_pkey PRIMARY KEY (aircraft_id),
	CONSTRAINT aircraft_model_id_fkey FOREIGN KEY (model_id) REFERENCES aircraft_model(model_id)
);

-- Drop table

-- DROP TABLE public.airport;

CREATE TABLE public.airport (
	short_code varchar(10) NOT NULL,
	country varchar(100) NOT NULL,
	"name" varchar(200) NOT NULL,
	location_id int4 NOT NULL,
	CONSTRAINT airport_pkey PRIMARY KEY (short_code),
	CONSTRAINT airport_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(location_id)
);

-- Drop table

-- DROP TABLE public.booking;

CREATE TABLE public.booking (
	booking_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	booked_date date NOT NULL,
	customer_id uuid NOT NULL,
	CONSTRAINT booking_pkey PRIMARY KEY (booking_id),
	CONSTRAINT booking_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Drop table

-- DROP TABLE public.customer_login;

CREATE TABLE public.customer_login (
	"password" varchar(255) NOT NULL,
	customer_id uuid NOT NULL,
	CONSTRAINT customer_login_pkey PRIMARY KEY (customer_id),
	CONSTRAINT customer_login_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Drop table

-- DROP TABLE public.management_login;

CREATE TABLE public.management_login (
	management_id uuid NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT management_login_management_id_key UNIQUE (management_id),
	CONSTRAINT management_login_management_id_fkey FOREIGN KEY (management_id) REFERENCES management(management_id)
);

-- Drop table

-- DROP TABLE public.parent_location;

CREATE TABLE public.parent_location (
	parent_location int4 NOT NULL,
	child_location int4 NOT NULL,
	CONSTRAINT parent_location_child_location_fkey FOREIGN KEY (child_location) REFERENCES location(location_id),
	CONSTRAINT parent_location_parent_location_fkey FOREIGN KEY (parent_location) REFERENCES location(location_id)
);

-- Drop table

-- DROP TABLE public.route;

CREATE TABLE public.route (
	route_id serial NOT NULL,
	origin_id varchar(10) NOT NULL,
	destination_id varchar(10) NOT NULL,
	CONSTRAINT route_pkey PRIMARY KEY (route_id),
	CONSTRAINT route_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES airport(short_code),
	CONSTRAINT route_origin_id_fkey FOREIGN KEY (origin_id) REFERENCES airport(short_code)
);

-- Drop table

-- DROP TABLE public.seat;

CREATE TABLE public.seat (
	seat_id serial NOT NULL,
	aircraft_model int4 NOT NULL,
	class_id int4 NOT NULL,
	"row" int2 NOT NULL,
	"column" bpchar(1) NOT NULL,
	CONSTRAINT seat_pkey PRIMARY KEY (seat_id),
	CONSTRAINT seat_class_id_fkey FOREIGN KEY (class_id) REFERENCES class(class_id),
	CONSTRAINT seat_fk FOREIGN KEY (aircraft_model) REFERENCES aircraft_model(model_id)
);

-- Drop table

-- DROP TABLE public.flight;

CREATE TABLE public.flight (
	flight_id serial NOT NULL,
	active_status bool NOT NULL DEFAULT true,
	journey_duration time NOT NULL,
	departure_time time NOT NULL,
	route_id int4 NOT NULL,
	aircraft_model int4 NOT NULL,
	CONSTRAINT flight_pkey PRIMARY KEY (flight_id),
	CONSTRAINT flight_fk FOREIGN KEY (aircraft_model) REFERENCES aircraft_model(model_id),
	CONSTRAINT flight_route_id_fkey FOREIGN KEY (route_id) REFERENCES route(route_id)
);

-- Drop table

-- DROP TABLE public.price;

CREATE TABLE public.price (
	class_id int4 NOT NULL,
	amount numeric(10,2) NOT NULL,
	route_id int4 NOT NULL,
	CONSTRAINT price_pkey PRIMARY KEY (class_id, route_id),
	CONSTRAINT price_class_id_fkey FOREIGN KEY (class_id) REFERENCES class(class_id),
	CONSTRAINT price_route_id_fkey FOREIGN KEY (route_id) REFERENCES route(route_id)
);

-- Drop table

-- DROP TABLE public.schedule;

CREATE TABLE public.schedule (
	schedule_id serial NOT NULL,
	"date" date NOT NULL,
	duration_delay time NOT NULL DEFAULT '00:00:00'::time without time zone,
	departure_time_delay time NOT NULL DEFAULT '00:00:00'::time without time zone,
	flight_id int4 NOT NULL,
	state shedule_state NOT NULL,
	CONSTRAINT schedule_pkey PRIMARY KEY (schedule_id),
	CONSTRAINT schedule_flight_id_fkey FOREIGN KEY (flight_id) REFERENCES flight(flight_id)
);
CREATE UNIQUE INDEX schedule_flight_id_idx ON public.schedule USING btree (flight_id, date);

-- Drop table

-- DROP TABLE public.ticket;

CREATE TABLE public.ticket (
	ticket_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	passenger_id uuid NOT NULL,
	seat_id int4 NOT NULL,
	flight_id int4 NOT NULL,
	"date" date NOT NULL,
	booking_id uuid NOT NULL,
	price numeric(10,2) NOT NULL,
	CONSTRAINT ticket_pkey PRIMARY KEY (ticket_id),
	CONSTRAINT ticket_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES booking(booking_id),
	CONSTRAINT ticket_flight_id_fkey FOREIGN KEY (flight_id) REFERENCES flight(flight_id),
	CONSTRAINT ticket_passenger_id_fkey FOREIGN KEY (passenger_id) REFERENCES passenger(passenger_id),
	CONSTRAINT ticket_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES seat(seat_id)
);

CREATE OR REPLACE FUNCTION public.checkticket(_ticket_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE ticketCount integer; 
BEGIN 
	SELECT count (*) INTO ticketCount from "ticket" WHERE "ticket"."ticket_id" = _ticket_id ; 
	RETURN ticketCount;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_airport(code character varying)
 RETURNS TABLE(short_code character varying, country character varying, name character varying)
 LANGUAGE plpgsql
AS $function$begin
	return query SELECT airport.short_code,airport.country,airport.name FROM public.airport where airport.short_code=code;
	
end;$function$
;

CREATE OR REPLACE FUNCTION public.get_customer_bookings(_customer_id uuid)
 RETURNS TABLE(booking_id uuid, first_name character varying, last_name character varying, booked_date date, ticket_count bigint, total_price numeric)
 LANGUAGE plpgsql
AS $function$
declare
	_first_name varchar(100);
	_last_name varchar(100);
begin
	select
		customer.first_name,
		customer.last_name
	into
		_first_name,
		_last_name
	from
		customer
	where
		customer_id = $1
	;

	return query 
	select 
		booking.booking_id,
		_first_name,
		_last_name,
		booking.booked_date,
		count (ticket_id),
		sum (price)
	from 
		booking
		join ticket on (booking.booking_id = ticket.booking_id)
	where
		customer_id = $1
	group by 
		booking.booking_id
	order by
		booked_date
	;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.inc()
 RETURNS TABLE(shor_code character varying, country character varying)
 LANGUAGE plpgsql
AS $function$begin
	return query SELECT airport.short_code,airport.country FROM public.airport;
	
end;$function$
;

CREATE OR REPLACE FUNCTION public.isbooked(id integer)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare 
	results  boolean;
	BEGIN
	select exists(select * from seat where seat_id = id) into results;
	return results;
	END;
$function$
;

CREATE OR REPLACE FUNCTION public.isbooked(seatid integer, flightid integer, dat date)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare 
	results  boolean;
	BEGIN
	select exists(select * from ticket where seat_id = seatId and flight_id = flightId and date = dat) into results;
	return results;
	END;
$function$
;

CREATE OR REPLACE FUNCTION public.schedule_flights()
 RETURNS TABLE(flight_id integer)
 LANGUAGE plpgsql
AS $function$
	BEGIN
return query select flight.flight_id from flight;
	
	END;
$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v1()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v1$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v1mc()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v1mc$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v3(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v3$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v4()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v5(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v5$function$
;

CREATE OR REPLACE FUNCTION public.uuid_nil()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_nil$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_dns()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_dns$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_oid()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_oid$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_url()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_url$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_x500()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_x500$function$
;
