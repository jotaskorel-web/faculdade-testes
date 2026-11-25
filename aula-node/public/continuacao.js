async function chamarAPI(url, metodo = "GET", dados) {
  const saida = document.getElementById("resultado");
  saida.textContent = "Consultando o servidor...";
  try {
    const opcoes = { method: metodo };
    if (dados !== undefined) {
      opcoes.headers = { "Content-Type": "application/json" };
      opcoes.body = JSON.stringify(dados);
    }
    const resposta = await fetch(url, opcoes);
    const retorno = await resposta.json();
    if (!resposta.ok) {
      throw new Error(retorno.erro || "Falha na requisição.");
    }
    saida.textContent = JSON.stringify(retorno, null, 2);
    return retorno;
  } catch (erro) {
    saida.textContent = "Erro: " + erro.message;
    return null;
  }
}

async function consultarBiblioteca() {
  const ficha = document.getElementById("fichaBiblioteca");
  ficha.textContent = "";
  const dados = await chamarAPI("/api/biblioteca");
  if (dados === null) return;
  ficha.textContent = dados.nome + " - " + dados.horario
    + " - " + dados.local + " - " + dados.telefone;
}

function consultarPrazo() {
  const perfil = document.getElementById("perfilLeitor").value;
  const url = "/api/prazo?perfil=" + encodeURIComponent(perfil);
  chamarAPI(url);
}

function buscarLivro() {
  const codigo = document.getElementById("codigoLivro").value;
  chamarAPI("/api/livro/" + encodeURIComponent(codigo));
}

function verificarDisponibilidade() {
  const quantidade = document.getElementById("quantidadeExemplares").value;
  chamarAPI("/api/disponibilidade", "POST", {
    quantidade: quantidade,
  });
}

function enviarPreferencia() {
  const escolha = document.getElementById("receberAvisos");
  chamarAPI("/api/preferencia", "POST", {
    receberAvisos: escolha.checked,
  });
}

async function calcularCopias() {
  const saida = document.getElementById("totalCopias");
  saida.textContent = "";
  const quantidade = document.getElementById("quantidadeCopias").value;
  const dados = await chamarAPI("/api/copias", "POST", {
    quantidade: quantidade,
  });
  if (dados === null) return;
  const reais = (dados.totalCentavos / 100).toFixed(2);
  saida.textContent = "Total: R$ " + reais.replace(".", ",");
}

function conferirReserva() {
  const nome = document.getElementById("nomeReserva").value;
  const titulo = document.getElementById("tituloReserva").value;
  chamarAPI("/api/conferir-reserva", "POST", {
    nome: nome,
    titulo: titulo,
  });
}

function consultarAviso() {
  chamarAPI("/api/aviso");
}

function salvarAviso() {
  const texto = document.getElementById("textoAviso").value;
  chamarAPI("/api/aviso", "POST", { texto: texto });
}

function usarAvisoPadrao() {
  chamarAPI("/api/aviso", "POST", { texto: "Biblioteca aberta." });
}

async function listarGeneros() {
  const lista = document.getElementById("listaGeneros");
  lista.textContent = "";
  const generos = await chamarAPI("/api/generos");
  if (generos === null) return;
  for (const genero of generos) {
    const item = document.createElement("li");
    item.textContent = genero;
    lista.appendChild(item);
  }
}

async function listarSugestoes() {
  const lista = document.getElementById("listaSugestoes");
  const situacao = document.getElementById("situacaoSugestoes");
  lista.textContent = "";
  situacao.textContent = "";
  const dados = await chamarAPI("/api/sugestoes");
  if (dados === null) return;
  if (dados.length === 0) {
    situacao.textContent = "Nenhuma sugestão cadastrada.";
  } else {
    situacao.textContent = "Total de sugestões: " + dados.length;
  }
  for (const titulo of dados) {
    const item = document.createElement("li");
    item.textContent = titulo;
    lista.appendChild(item);
  }
}

async function adicionarSugestao() {
  const campo = document.getElementById("tituloSugestao");
  const retorno = await chamarAPI("/api/sugestoes", "POST", {
    titulo: campo.value,
  });
  if (retorno === null) return;
  campo.value = "";
  await listarSugestoes();
}
