CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

DO $$
BEGIN
	IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = 'InitialMigration') THEN
    CREATE TABLE "Users" (
        id uuid NOT NULL,
        firstname character varying(100) NOT NULL,
        lastname character varying(100) NOT NULL,
        email character varying(256) NULL,
        mobilephone character varying(10) NULL,
        loginid character varying(256) NOT NULL,
        passwordhash character varying(128) NULL,
        salt character varying(16) NOT NULL,
        isdeactivated boolean NOT NULL DEFAULT FALSE,
        CONSTRAINT "PK_Users" PRIMARY KEY (id)
    );
	END IF;
END $$;

DO $$
BEGIN
	IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = 'InitialMigration') THEN
    CREATE TABLE "UserSessions" (
        id uuid NOT NULL,
		userid uuid NOT NULL,
		isactive boolean NOT NULL DEFAULT TRUE,
        CONSTRAINT "PK_UserSessions" PRIMARY KEY (id)
    );
	END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = 'InitialMigration') THEN
    INSERT INTO "Users" ("id", "firstname", "lastname", "loginid", "passwordhash", "salt")
    VALUES ('0922c344-00da-4eec-ae01-40ee7d827724', 'Daniel', 'Graham', 'dgraham', 'password123', 'password123');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = 'InitialMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('InitialMigration', '1.0.0');
    END IF;
END $$;
COMMIT;