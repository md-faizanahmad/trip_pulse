import {
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const locationPins = pgTable(
  "location_pins",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    osmType: varchar("osm_type", { length: 20 }).notNull(),
    osmId: varchar("osm_id", { length: 30 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    displayName: varchar("display_name", { length: 500 }).notNull(),
    country: varchar("country", { length: 100 }),
    countryCode: varchar("country_code", { length: 2 }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("location_pins_user_osm_unique").on(
      table.userId,
      table.osmType,
      table.osmId,
    ),
  ],
);

export const attractionPins = pgTable(
  "attraction_pins",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    osmType: varchar("osm_type", { length: 20 }).notNull(),
    osmId: varchar("osm_id", { length: 30 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    address: varchar("address", { length: 255 }),
    city: varchar("city", { length: 100 }),
    country: varchar("country", { length: 100 }),
    countryCode: varchar("country_code", { length: 2 }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("attraction_pins_user_osm_unique").on(
      table.userId,
      table.osmType,
      table.osmId,
    ),
  ],
);
