\echo "Delete and recreate vaccine hub database"
\prompt 'Return for yes or control-C to cancel ' answer

DROP DATABASE vaccine-hub;
CREATE DATABASE vaccine-hub;

\connect vaccine-hub;


\i vaccine-hub-schema.sql;