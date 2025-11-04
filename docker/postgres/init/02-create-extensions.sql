-- Enable required PostgreSQL extensions
\c parkealo_dev;

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS extension for location-based features (optional)
-- CREATE EXTENSION IF NOT EXISTS "postgis";

-- Enable pgcrypto extension for cryptographic functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enable btree_gist extension for advanced indexing
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- Create schema for user service
CREATE SCHEMA IF NOT EXISTS user_service;
CREATE SCHEMA IF NOT EXISTS auth_service;
CREATE SCHEMA IF NOT EXISTS parking_space_service;
CREATE SCHEMA IF NOT EXISTS booking_service;
CREATE SCHEMA IF NOT EXISTS payment_service;
CREATE SCHEMA IF NOT EXISTS search_service;
CREATE SCHEMA IF NOT EXISTS notification_service;
CREATE SCHEMA IF NOT EXISTS trust_safety_service;
