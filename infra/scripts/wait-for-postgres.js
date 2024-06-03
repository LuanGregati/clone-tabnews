const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleRequest);

  function handleRequest(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n✅ PostgreSQL está pronto e aceitando conexões!\n\n");
  }
}

process.stdout.write("🔴 Aguardando PostgreSQL aceitar conexões.\n");
checkPostgres();
