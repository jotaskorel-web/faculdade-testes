const express = require("express");
const path = require("node:path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const produtos = [
  { id: 1, nome: "Teclado", preco: 90 },
  { id: 2, nome: "Mouse", preco: 50 },
  { id: 3, nome: "Monitor", preco: 800 },
];

let contador = 0;
let tarefas = [];
let proximoId = 1;

function lerNumero(valor) {
  if ((typeof valor !== "string" && typeof valor !== "number") || String(valor).trim() === "") {
    return NaN;
  }
  return Number(valor);
}

function lerId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

app.get("/api/teste", (req, res) => {
  res.json({ mensagem: "Servidor Node.js funcionando!" });
});

app.get("/api/saudacao", (req, res) => {
  const nome = typeof req.query.nome === "string" ? req.query.nome.trim() : "";
  if (!nome) {
    return res.status(400).json({ erro: "Informe seu nome." });
  }
  res.json({
    mensagem: `Olá, ${nome}!`,
    disciplina: "Programação Web 2",
  });
});

app.post("/api/calcular", (req, res) => {
  const a = lerNumero(req.body?.a);
  const b = lerNumero(req.body?.b);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return res.status(400).json({ erro: "Informe dois números válidos." });
  }

  const operacao = req.body?.operacao;
  let resultado;
  if (operacao === "somar") {
    resultado = a + b;
  } else if (operacao === "subtrair") {
    resultado = a - b;
  } else if (operacao === "multiplicar") {
    resultado = a * b;
  } else if (operacao === "dividir") {
    if (b === 0) {
      return res.status(400).json({ erro: "Divisão por zero não é permitida." });
    }
    resultado = a / b;
  } else {
    return res.status(400).json({ erro: "Operação desconhecida." });
  }

  res.json({ resultado });
});

app.post("/api/media", (req, res) => {
  const campos = [req.body?.nota1, req.body?.nota2, req.body?.nota3];
  const notas = [];
  for (const campo of campos) {
    const nota = lerNumero(campo);
    if (!Number.isFinite(nota)) {
      return res.status(400).json({ erro: "Informe três notas válidas." });
    }
    if (nota < 0 || nota > 10) {
      return res.status(400).json({ erro: "Nota fora da faixa. Use valores de 0 a 10." });
    }
    notas.push(nota);
  }

  const media = (notas[0] + notas[1] + notas[2]) / 3;
  let situacao = "Reprovado";
  if (media >= 7) {
    situacao = "Aprovado";
  } else if (media >= 5) {
    situacao = "Recuperação";
  }

  res.json({
    media: Math.round(media * 100) / 100,
    situacao,
  });
});

app.post("/api/analisar-texto", (req, res) => {
  if (typeof req.body?.texto !== "string") {
    return res.status(400).json({ erro: "Informe um texto válido." });
  }
  const texto = req.body.texto.trim();
  if (!texto) {
    return res.status(400).json({ erro: "Informe um texto válido." });
  }
  res.json({
    comprimento: texto.length,
    palavras: texto.split(/\s+/).length,
    maiusculas: texto.toUpperCase(),
  });
});

app.get("/api/produtos", (req, res) => {
  const busca = typeof req.query.busca === "string" ? req.query.busca.trim().toLowerCase() : "";
  const encontrados = produtos.filter((produto) => produto.nome.toLowerCase().includes(busca));
  res.json(encontrados);
});

app.post("/api/sortear", (req, res) => {
  if (typeof req.body?.nomes !== "string") {
    return res.status(400).json({ erro: "Informe os nomes como texto, um por linha." });
  }
  const participantes = req.body.nomes
    .split(/\r?\n/)
    .map((nome) => nome.trim())
    .filter((nome) => nome !== "");
  if (participantes.length < 2) {
    return res.status(400).json({ erro: "Informe pelo menos dois nomes." });
  }
  const indice = Math.floor(Math.random() * participantes.length);
  res.json({
    sorteado: participantes[indice],
    quantidade: participantes.length,
  });
});

app.get("/api/contador", (req, res) => {
  res.json({ contador });
});

app.post("/api/contador/incrementar", (req, res) => {
  contador += 1;
  res.json({ contador });
});

app.post("/api/contador/zerar", (req, res) => {
  contador = 0;
  res.json({ contador });
});

app.post("/api/tarefas", (req, res) => {
  if (typeof req.body?.titulo !== "string") {
    return res.status(400).json({ erro: "O título deve ter de 3 a 80 caracteres." });
  }
  const titulo = req.body.titulo.trim();
  if (titulo.length < 3 || titulo.length > 80) {
    return res.status(400).json({ erro: "O título deve ter de 3 a 80 caracteres." });
  }
  const tarefa = { id: proximoId, titulo, concluida: false };
  proximoId += 1;
  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});

app.get("/api/tarefas", (req, res) => {
  const status = req.query.status;
  if (status === undefined || status === "" || status === "todas") {
    return res.json(tarefas);
  }
  if (status === "pendentes") {
    return res.json(tarefas.filter((tarefa) => tarefa.concluida === false));
  }
  if (status === "concluidas") {
    return res.json(tarefas.filter((tarefa) => tarefa.concluida === true));
  }
  return res.status(400).json({ erro: "Status inválido. Use todas, pendentes ou concluidas." });
});

app.get("/api/resumo", (req, res) => {
  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  res.json({
    total,
    concluidas,
    pendentes: total - concluidas,
  });
});

app.patch("/api/tarefas/:id", (req, res) => {
  const id = lerId(req.params.id);
  if (id === null) {
    return res.status(400).json({ erro: "Identificador inválido." });
  }
  const tarefa = tarefas.find((item) => item.id === id);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }
  if (typeof req.body?.concluida !== "boolean") {
    return res.status(400).json({ erro: "O campo concluida deve ser true ou false." });
  }
  tarefa.concluida = req.body.concluida;
  res.json(tarefa);
});

app.delete("/api/tarefas/:id", (req, res) => {
  const id = lerId(req.params.id);
  if (id === null) {
    return res.status(400).json({ erro: "Identificador inválido." });
  }
  const indice = tarefas.findIndex((item) => item.id === id);
  if (indice === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }
  tarefas.splice(indice, 1);
  res.json({ mensagem: "Tarefa excluída." });
});

app.use("/api", (req, res) => {
  res.status(404).json({ erro: "Rota nao encontrada." });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Abra http://127.0.0.1:3000");
});
