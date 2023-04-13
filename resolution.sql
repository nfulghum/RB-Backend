\echo 'Delete and recreate resolution db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE resolution;
CREATE DATABASE resolution;
\connect resolution

\i resolution-schema.sql


\echo 'Delete and recreate resolution_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE resolution_test;
CREATE DATABASE resolution_test;
\connect resolution_test;

\i resolution-schema.sql