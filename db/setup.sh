#!/bin/bash
set -e

mysqld_safe --datadir='/var/lib/mysql' &

while ! mariadb-admin ping --silent; do
    sleep 1
done

echo "Database is ready. Running configuration queries..."

mariadb -u root -p"1234" <<EOF

CREATE DATABASE IF NOT EXISTS freelancer;



CREATE USER IF NOT EXISTS 'zakaria'@'%' IDENTIFIED BY '1234';
        

GRANT ALL PRIVILEGES ON freelancer.* TO 'zakaria'@'%';

FLUSH PRIVILEGES;
EOF

mariadb-admin -u root shutdown


exec mysqld_safe

