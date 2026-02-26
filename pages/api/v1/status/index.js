import database from "../../../../infra/database.js";

async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 AS sum;");
  console.log(result.rows[0]);

  res.status(200).json({ message: "Alunos do curso.dev são acima da média!" });
}

export default status;
