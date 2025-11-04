# DATA MODEL
The following databases are designed to support the core functionalities of the Parkealo platform, ensuring efficient data management and retrieval for users, parking spaces, and bookings.

## DATABASES
- **parkealo_users_service**: Handles user data, authentication, and profile management.
- **parkealo_parking_space_service**: Manages parking space listings, availability, and pricing.
- **parkealo_booking_service**: Oversees booking processes, approvals, and history.
- **parkealo_payment_service**: Manages payment processing, transactions, and payouts.
- **parkealo_search_service**: Facilitates location-based search and filtering of parking spaces.
- **parkealo_notification_service**: Handles communication, alerts, and notifications to users.
- **parkealo_trust_service**: Manages reviews, ratings, and user verification processes.

## PLUGINS
- uuid-ossp
- pgcrypto
- btree_gist

## SCHEMAS
- user_service
- auth_service
- parking_space_service
- booking_service
- payment_service
- search_service
- notification_service
- trust_safety_service
