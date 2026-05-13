import useSWR from "swr";

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt isLoading={isLoading} data={data} />
      <h2>Banco de dados</h2>
      <ul>
        <li>
          <DatabaseVersion isLoading={isLoading} data={data} />
        </li>
        <li>
          <DatabaseOpenedConnections isLoading={isLoading} data={data} />
        </li>
        <li>
          <DatabaseMaxConnections isLoading={isLoading} data={data} />
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

function UpdatedAt({ isLoading, data }) {
  const UpdatedAtText = isLoading
    ? "Carregando..."
    : new Date(data.updated_at).toLocaleString("pt-BR");

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function DatabaseVersion({ isLoading, data }) {
  const databaseVersionText = isLoading
    ? "Carregando..."
    : data.dependencies.database.version;

  return <div>Versão do Postgres: {databaseVersionText}</div>;
}

function DatabaseOpenedConnections({ isLoading, data }) {
  const databaseOpenedConnectionsText = isLoading
    ? "Carregando..."
    : data.dependencies.database.opened_connections;

  return <div>Conexões abertas: {databaseOpenedConnectionsText}</div>;
}

function DatabaseMaxConnections({ isLoading, data }) {
  const databaseMaxConnectionsText = isLoading
    ? "Carregando..."
    : data.dependencies.database.max_connections;

  return <div>Conexões máximas: {databaseMaxConnectionsText}</div>;
}
