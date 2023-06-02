// Selecionando os elementos do DOM
const modal = document.querySelector('.modal-container') // Modal
const tbody = document.querySelector('tbody') // Tabela
const sNome = document.querySelector('#m-nome') // Input para o nome
const sEditora = document.querySelector('#m-editora') // Input para a editora
const sValor = document.querySelector('#m-valor') // Input para o valor
const btnSalvar = document.querySelector('#btnSalvar') // Botão de salvar

let itens // Variável para armazenar os itens
let id // ID do item atualmente sendo editado

// Função para abrir o modal (adicionar/editar item)
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  // Fechar o modal ao clicar fora dele
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  // Preencher os inputs com os dados do item a ser editado
  if (edit) {
    sNome.value = itens[index].nome
    sEditora.value = itens[index].editora
    sValor.value = itens[index].valor
    id = index
  } else {
    // Limpar os inputs
    sNome.value = ''
    sEditora.value = ''
    sValor.value = ''
  }
}

// Função para editar um item
function editItem(index) {
  openModal(true, index)
}

// Função para deletar um item
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

// Função para inserir um item na tabela
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.editora}</td>
    <td>R$ ${item.valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

// Evento de clique no botão de salvar
btnSalvar.onclick = e => {
  // Verificar se os campos estão preenchidos
  if (sNome.value == '' || sEditora.value == '' || sValor.value == '') {
    return
  }

  e.preventDefault();

  // Atualizar o item existente ou adicionar um novo item
  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].editora = sEditora.value
    itens[id].valor = sValor.value
  } else {
    itens.push({'nome': sNome.value, 'editora': sEditora.value, 'valor': sValor.value})
  }

  setItensBD()

  // Fechar o modal e recarregar os itens
  modal.classList.remove('active')
  loadItens()
  id = undefined
}

// Função para carregar os itens
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

// Função para obter os itens do localStorage
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

// Função para salvar os itens no localStorage
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// Carregar os itens ao iniciar a página
loadItens()
