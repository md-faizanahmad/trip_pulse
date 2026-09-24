CREATE TABLE "attraction_pins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"osm_type" varchar(20) NOT NULL,
	"osm_id" varchar(30) NOT NULL,
	"name" varchar(255) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"category" varchar(50) NOT NULL,
	"address" varchar(255),
	"city" varchar(100),
	"country" varchar(100),
	"country_code" varchar(2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "attraction_pins_user_osm_unique" UNIQUE("user_id","osm_type","osm_id")
);
--> statement-breakpoint
CREATE TABLE "location_pins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"osm_type" varchar(20) NOT NULL,
	"osm_id" varchar(30) NOT NULL,
	"name" varchar(255) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"display_name" varchar(500) NOT NULL,
	"country" varchar(100),
	"country_code" varchar(2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "location_pins_user_osm_unique" UNIQUE("user_id","osm_type","osm_id")
);
--> statement-breakpoint
ALTER TABLE "attraction_pins" ADD CONSTRAINT "attraction_pins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location_pins" ADD CONSTRAINT "location_pins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;