/**
 * Criamos uma função "status" que pode ter qualquer nome
 * Essa função recebe dois parâmetros:
 * 
 * request -> informações que são passadas lá de de fora para aqui dentro do código
 * response -> informações que o código passa para o mundo de fora
 */
function status(request, response) {
  // Utilizo os métodos "status" e "send" do objeto "response" para
  // determinar qual retorno essa minha rota vai ter
  response.status(200).json({ "mensagem": "Alunos do curso.dev são acima da média!" });
}

// Export a função "status" como a função padrão da rota.
// Dessa forma o Next.js vai saber qual função chamar quando a rota for chamada.
export default status;
