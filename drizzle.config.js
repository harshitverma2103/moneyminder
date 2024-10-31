/** @type {import("drizzle-kit").config} */
export default {
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  dbCredentials: {
    url: process.eventNames.NEXT_PUBLIC_DATABASE_URL,
  },
};
