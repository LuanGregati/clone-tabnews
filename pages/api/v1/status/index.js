import database from "infra/database";

async function status(request, response) {
  const updated_at = new Date().toISOString();
  const postgres_version = await database.query("SHOW server_version;");
  const postgres_max_connections = await database.query(
    "SHOW max_connections;",
  );
  const postgres_active_connections = await database.query({
    text: "SELECT COUNT(*)::int AS active_connections FROM pg_stat_activity WHERE datname = $1",
    values: [process.env.POSTGRES_DB],
  });

  response.status(200).json({
    updated_at,
    dependencies: {
      database: {
        version: postgres_version.rows[0].server_version,
        max_connections: parseInt(
          postgres_max_connections.rows[0].max_connections,
        ),
        opened_connections:
          postgres_active_connections.rows[0].active_connections,
      },
    },
  });
}

export default status;
