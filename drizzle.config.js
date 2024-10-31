/** @type {import("drizzle-kit").config} */
export default {
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  dbCredentials: {
    url: "postgresql://neondb_owner:otzaBrVxZ30q@ep-spring-credit-a58md4lk.us-east-2.aws.neon.tech/Money%20Minder?sslmode=require",
  },
};
