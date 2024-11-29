document.addEventListener("DOMContentLoaded", () => {
    let page = document.body.dataset.page;
    console.log(`Página carregada: ${page}`);
});

let getEstoque = () => JSON.parse(localStorage.getItem("estoque")) || []
let setEstoque = (estoque) => localStorage.setItem("estoque", JSON.stringify(estoque))


let cadastrarItem = (nome, quantidade, categoria) => {
  let estoque = getEstoque()
  estoque.push({ nome, quantidade, categoria })
  setEstoque(estoque)
  alert("Item cadastrado com sucesso!")
}

let visualizarEstoque = () => {
    let estoque = JSON.parse(localStorage.getItem("estoque")) || [];
    let tabela = document.querySelector("#estoque-tabela tbody");
    tabela.innerHTML = "";
    estoque.forEach(({ nome, quantidade, categoria }) => {
        console.log(`Adicionando item: Nome=${nome}, Quantidade=${quantidade}, Categoria=${categoria}`);
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${nome}</td><td>${quantidade}</td><td>${categoria}</td>`;
        tabela.appendChild(tr);
    });
};


let alterarItem = (nome, novaQuantidade) => {
  let estoque = getEstoque()
  let item = estoque.find((item) => item.nome === nome)

  if (!item) {
    alert("Item não encontrado!")
    return
  }
  
  item.quantidade = novaQuantidade
  setEstoque(estoque)
  alert("Quantidade alterada com sucesso!")
}

let removerItem = (nome) => {
  let estoque = getEstoque()
  let novoEstoque = estoque.filter((item) => item.nome !== nome)

  if (estoque.length === novoEstoque.length) {
    alert("Item não encontrado!")
    return
  }

  setEstoque(novoEstoque)
  alert("Item removido com sucesso!")
}


document.addEventListener("DOMContentLoaded", () => {
  let page = document.body.dataset.page

  if (page === "cadastro") {
    let form = document.getElementById("cadastro-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      let nome = document.getElementById("nome").value
      let quantidade = parseInt(document.getElementById("quantidade").value, 10)
      let categoria = document.getElementById("categoria").value
      cadastrarItem(nome, quantidade, categoria)
      form.reset()
    })
  }

  if (page === "vizualizar") {
    visualizarEstoque()
  }

  if (page === "alterar") {
    let form = document.getElementById("alterar-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      let nome = document.getElementById("nome").value
      let novaQuantidade = parseInt(document.getElementById("quantidade").value, 10)
      alterarItem(nome, novaQuantidade)
      form.reset()
    })
  }

  if (page === "remover") {
    let form = document.getElementById("remover-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      let nome = document.getElementById("nome").value
      removerItem(nome)
      form.reset()
    })
  }
})