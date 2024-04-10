import "dotenv/config";
import { nanoid } from "nanoid";
import process from "node:process";
import pg from "pg";

const linkLength = Number.parseInt(process.env.LINK_LENGTH, 10) ?? 8;

// connection via standard postgres environment variables (PGXXX) from .env file
const pool = new pg.Pool();

/**
 * Closes all connections to DB (before closing the app)
 */
export async function end() {
  await pool.end();
}

/**
 * Check if database is OK and returns server's information
 */
export async function getServerStats() {
  const result = await pool.query(
    ` select
        current_setting('server_version') as "postgresVersion",
        current_database() as "postgresDb",
        current_user as "postgresUser",
        current_timestamp as "postgresCurrentTS",
        current_setting('transaction_isolation') as "postgresIsolationLevel"
    `,
  );
  return result.rows[0];
}

/**
 * Returns some statistics about all links
 */
export async function getAllLinksStats() {
  const result = await pool.query(
    ` select
        sum(visits)::integer as visits_count,
        count(*)::integer as links_count
      from links;
    `,
  );
  return result.rows[0];
}

/**
 * Returns information about one link (identified by its short URL)
 */
export async function getLinkByShort(short) {
  try {
    await setLinkVisits(short);
    await setLinkLastVisited(short);
  } catch (error) {
    console.log(error);
  }
  const result = await pool.query(
    ` select *
        from links
        where short = $1;
      `,
    [short],
  );

  return result.rows[0];
}

export async function getLinkByShortStatus(short) {
  const result = await pool.query(
    ` select 
        short,
        last_visited_at,
        visits
        from links
        where short = $1;
      `,
    [short],
  );
  return result.rows[0];
}

/**
 * Incrementes link visits
 */

export async function setLinkVisits(short) {
  const result = await pool.query(
    ` update links
      set visits = visits + 1
      where short = $1
      returning *;
    `,
    [short],
  );
  return result.rows[0];
}

export async function setLinkLastVisited(short) {
  const result = await pool.query(
    ` update links
      set last_visited_at = now() 
      where short = $1
      returning *;
    `,
    [short],
  );
  return result.rows[0];
}

/**
 * Create link from long uri. Generates random short URL.
 */
export async function createLink(uri) {
  const short = await nanoid(linkLength);
  const result = await pool.query(
    ` insert into links(short, long)
        values ($1, $2)
      returning *;
    `,
    [short, uri],
  );
  return result.rows[0];
}

export async function deleteLink(short, secret_key) {
  const result = await pool.query(
    ` delete from links 
      where short = $1 and secret_key = $2
      returning *;
    `,
    [short, secret_key],
  );
  return result.rows[0];
}
