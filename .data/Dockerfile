FROM postgres:14.2
COPY ./initialize-database.sql /docker-entrypoint-initdb.d/01-initialize-database.sql
COPY ./postgresql.conf /etc/postgresql/postgresql.conf
RUN apt update
RUN apt-get --assume-yes install postgresql-14-wal2json
CMD [ "-c", "config_file=/etc/postgresql/postgresql.conf" ]