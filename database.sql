CREATE TABLE "koala" (
	"id" serial primary key,
	"name" varchar(40) not null,
	"gender" varchar(6) not null,
	"age" integer not null,
	"ready_to_transfer" varchar(5),
	"notes" varchar(50)
);

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Scotty', 'M', '4', 'Y', 'Born in Guatemala');

SELECT * FROM "koala";

