-- Create databases for different services
CREATE DATABASE IF NOT EXISTS parkealo_user_service;
CREATE DATABASE IF NOT EXISTS parkealo_auth_service;
CREATE DATABASE IF NOT EXISTS parkealo_parking_space_service;
CREATE DATABASE IF NOT EXISTS parkealo_booking_service;
CREATE DATABASE IF NOT EXISTS parkealo_payment_service;
CREATE DATABASE IF NOT EXISTS parkealo_search_service;
CREATE DATABASE IF NOT EXISTS parkealo_notification_service;
CREATE DATABASE IF NOT EXISTS parkealo_trust_safety_service;

-- Grant privileges to the application user
GRANT ALL PRIVILEGES ON DATABASE parkealo_user_service TO parkealo_user;
GRANT ALL PRIVILEGES ON DATABASE parkealo_auth_service TO parkealo_user;
GRANT ALL PRIVILEGES ON DATABASE parkealo_parking_space_service TO parkealo_user;
GRANT ALL PRIVILEGES ON DATABASE parkealo_booking_service TO parkealo_user;
GRANT ALL PRIVILEGES ON DATABASE parkealo_payment_service TO parkealo_user;
GRANT ALL PRIVILEGES ON DATABASE parkealo_search_service TO parkealo_user;
GRANT ALL PRIVILEGES ON DATABASE parkealo_notification_service TO parkealo_user;
GRANT ALL PRIVILEGES ON DATABASE parkealo_trust_safety_service TO parkealo_user;
