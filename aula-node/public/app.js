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
      throw new Error(retorno.erro || "Falha na requisicao.");
    }
    saida.textContent = JSON.stringify(retorno, null, 2);
    return retorno;
  } catch (erro) {
    saida.textContent = "Erro: " + erro.message;
    return null;
  }
}

function mostrarErroLocal(elemento) {
  elemento.textContent = document.getElementById("resultado").textContent;
}

function saudar() {
  const nome = document.getElementById("nome").value;
  chamarAPI("/api/saudacao?nome=" + encodeURIComponent(nome)).then((retorno) => {
    const saida = document.getElementById("resultadoSaudacao");
    if (retorno === null) {
      mostrarErroLocal(saida);
      return;
    }
    saida.textContent = retorno.mensagem + " Disciplina: " + retorno.disciplina;
  });
}

function calcular() {
  chamarAPI("/api/calcular", "POST", {
    a: document.getElementById("numeroA").value,
    b: document.getElementById("numeroB").value,
    operacao: document.getElementById("operacao").value,
  }).then((retorno) => {
    const saida = document.getElementById("resultadoCalculo");
    if (retorno === null) {
      mostrarErroLocal(saida);
      return;
    }
    saida.textContent = "Resultado: " + retorno.resultado;
  });
}

function verificarSituacao() {
  chamarAPI("/api/media", "POST", {
    nota1: document.getElementById("nota1").value,
    nota2: document.getElementById("nota2").value,
    nota3: document.getElementById("nota3").value,
  }).then((retorno) => {
    const saida = document.getElementById("resultadoMedia");
    if (retorno === null) {
      mostrarErroLocal(saida);
      return;
    }
    saida.textContent = "Média: " + retorno.media + " — Situação: " + retorno.situacao;
  });
}

function analisarTexto() {
  chamarAPI("/api/analisar-texto", "POST", {
    texto: document.getElementById("textoAnalise").value,
  }).then((retorno) => {
    const saida = document.getElementById("resultadoTexto");
    if (retorno === null) {
      mostrarErroLocal(saida);
      return;
    }
    saida.textContent =
      "Comprimento: " + retorno.comprimento +
      " — Palavras: " + retorno.palavras +
      " — Maiúsculas: " + retorno.maiusculas;
  });
}

function consultarProdutos() {
  const busca = document.getElementById("buscaProduto").value;
  chamarAPI("/api/produtos?busca=" + encodeURIComponent(busca)).then((retorno) => {
    const saida = document.getElementById("resultadoProdutos");
    saida.replaceChildren();
    if (!Array.isArray(retorno)) {
      const item = document.createElement("li");
      item.textContent = document.getElementById("resultado").textContent;
      saida.appendChild(item);
      return;
    }
    if (retorno.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Nenhum produto encontrado.";
      saida.appendChild(item);
      return;
    }
    for (const produto of retorno) {
      const item = document.createElement("li");
      item.textContent = produto.id + " — " + produto.nome + " — R$ " + produto.preco;
      saida.appendChild(item);
    }
  });
}

function sortear() {
  chamarAPI("/api/sortear", "POST", {
    nomes: document.getElementById("nomesSorteio").value,
  }).then((retorno) => {
    const saida = document.getElementById("resultadoSorteio");
    if (retorno === null) {
      mostrarErroLocal(saida);
      return;
    }
    saida.textContent = "Sorteado: " + retorno.sorteado + " — Quantidade: " + retorno.quantidade;
  });
}

function consultarContador() {
  chamarAPI("/api/contador").then(mostrarContador);
}

function incrementarContador() {
  chamarAPI("/api/contador/incrementar", "POST").then(mostrarContador);
}

function zerarContador() {
  chamarAPI("/api/contador/zerar", "POST").then(mostrarContador);
}

function mostrarContador(retorno) {
  const saida = document.getElementById("resultadoContador");
  if (retorno === null) {
    mostrarErroLocal(saida);
    return;
  }
  saida.textContent = "Contador: " + retorno.contador;
}

function definirAviso(texto) {
  document.getElementById("aviso").textContent = texto;
}

async function adicionarTarefa() {
  const campo = document.getElementById("tituloTarefa");
  const retorno = await chamarAPI("/api/tarefas", "POST", { titulo: campo.value });
  if (retorno !== null) {
    definirAviso("Tarefa cadastrada.");
    campo.value = "";
    await listarTarefas();
  } else {
    definirAviso(document.getElementById("resultado").textContent);
  }
}

async function listarTarefas() {
  const status = document.getElementById("filtroStatus").value;
  const tarefas = await chamarAPI("/api/tarefas?status=" + encodeURIComponent(status));
  if (tarefas === null) {
    definirAviso(document.getElementById("resultado").textContent);
    return;
  }
  montarLista(tarefas);
  await atualizarResumo();
}

async function atualizarResumo() {
  const resumo = await chamarAPI("/api/resumo");
  if (resumo === null) {
    return;
  }
  document.getElementById("resumoTotal").textContent = resumo.total;
  document.getElementById("resumoConcluidas").textContent = resumo.concluidas;
  document.getElementById("resumoPendentes").textContent = resumo.pendentes;
}

function montarLista(tarefas) {
  const lista = document.getElementById("listaTarefas");
  lista.replaceChildren();
  if (!Array.isArray(tarefas) || tarefas.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Nenhuma tarefa cadastrada.";
    lista.appendChild(vazio);
    return;
  }

  const tabela = document.createElement("table");
  const cabecalho = document.createElement("thead");
  const linhaCabecalho = document.createElement("tr");
  for (const titulo of ["Id", "Título", "Situação", "Ações"]) {
    const celula = document.createElement("th");
    celula.textContent = titulo;
    linhaCabecalho.appendChild(celula);
  }
  cabecalho.appendChild(linhaCabecalho);
  tabela.appendChild(cabecalho);

  const corpo = document.createElement("tbody");
  for (const tarefa of tarefas) {
    const linha = document.createElement("tr");

    const colunaId = document.createElement("td");
    colunaId.textContent = String(tarefa.id);
    const colunaTitulo = document.createElement("td");
    colunaTitulo.textContent = tarefa.titulo;
    const colunaSituacao = document.createElement("td");
    colunaSituacao.textContent = tarefa.concluida ? "Concluída" : "Pendente";

    const colunaAcoes = document.createElement("td");
    const botaoSituacao = document.createElement("button");
    botaoSituacao.type = "button";
    botaoSituacao.textContent = tarefa.concluida ? "Reabrir" : "Concluir";
    botaoSituacao.addEventListener("click", () => {
      mudarSituacao(tarefa.id, !tarefa.concluida);
    });
    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "perigo";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", () => {
      excluirTarefa(tarefa.id);
    });
    colunaAcoes.append(botaoSituacao, botaoExcluir);

    linha.append(colunaId, colunaTitulo, colunaSituacao, colunaAcoes);
    corpo.appendChild(linha);
  }
  tabela.appendChild(corpo);
  lista.appendChild(tabela);
}

async function mudarSituacao(id, concluida) {
  const retorno = await chamarAPI("/api/tarefas/" + id, "PATCH", { concluida });
  if (retorno !== null) {
    definirAviso(concluida ? "Tarefa concluída." : "Tarefa reaberta.");
    await listarTarefas();
  } else {
    definirAviso(document.getElementById("resultado").textContent);
  }
}

async function excluirTarefa(id) {
  const retorno = await chamarAPI("/api/tarefas/" + id, "DELETE");
  if (retorno !== null) {
    definirAviso(retorno.mensagem || "Tarefa excluída.");
    await listarTarefas();
  } else {
    definirAviso(document.getElementById("resultado").textContent);
  }
}

listarTarefas();
