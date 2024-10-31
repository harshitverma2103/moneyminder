import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://neondb_owner:otzaBrVxZ30q@ep-spring-credit-a58md4lk.us-east-2.aws.neon.tech/Money%20Minder?sslmode=require"
);
const db = drizzle(sql, { schema });
