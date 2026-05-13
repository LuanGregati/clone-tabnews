import useSWR from "swr";

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <h2>Banco de dados</h2>
      <ul>
        <li>
          <DatabaseVersion />
        </li>
        <li>
          <DatabaseOpenedConnections />
        </li>
        <li>
          <DatabaseMaxConnections />
        </li>
      </ul>
    </>
  );
}

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const UpdatedAtText = isLoading
    ? "Carregando..."
    : new Date(data.updated_at).toLocaleString("pt-BR");

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function DatabaseVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const databaseVersionText = isLoading
    ? "Carregando..."
    : data.dependencies.database.version;

  return <div>Versão do Postgres: {databaseVersionText}</div>;
}

function DatabaseOpenedConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const databaseOpenedConnectionsText = isLoading
    ? "Carregando..."
    : data.dependencies.database.opened_connections;

  return <div>Conexões abertas: {databaseOpenedConnectionsText}</div>;
}

function DatabaseMaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const databaseMaxConnectionsText = isLoading
    ? "Carregando..."
    : data.dependencies.database.max_connections;

  return <div>Conexões máximas: {databaseMaxConnectionsText}</div>;
}
