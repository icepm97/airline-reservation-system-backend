# airline-reservation-system-backend

POST /api/management/login

POST /api/customer/login

GET  /api/customer

POST /api/customer

GET  /api/bookings

GET  /api/bookings/!id

POST /api/bookings

GET  /api/tickets/!id

pg_dump -h ec2-174-129-32-230.compute-1.amazonaws.com -U rjxpoyjijcqoyl --schema-only d2f3aprc461g0l > ars_schema.txt

pg_dump -h ec2-174-129-32-230.compute-1.amazonaws.com -U rjxpoyjijcqoyl --schema-only -f ars_schema -F d d2f3aprc461g0l 

