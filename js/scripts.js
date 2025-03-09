const urlMarca = "https://parallelum.com.br/fipe/api/v1/carros/marcas"

const marcaSelect = document.getElementById("marca") //ele pega o id do select
const botaoModelo = document.getElementById("botao") // pega o id do botao
const resultado = document.getElementById("resultado") //pega o id do resultado

async function carregarMarcas() {
    try {
        const response = await fetch(urlMarca); //cria requisição com a url
        const marcas = await response.json(); //transforma a response em json

        marcaSelect.innerHTML = "<option value=''>Selecione uma marca</option>"; // insere o item no html

        marcas.forEach(marca => {
            const option = document.createElement("option"); //criar um elemento opções
            option.value = marca.codigo; //valor do codigo
            option.textContent = marca.nome; //nome inserido
            marcaSelect.appendChild(option);//atribuir  o select com as opções
        });

    } catch (error) {
        marcaSelect.innerHTML = "<option value=''>Erro ao carregar marcas</option>"; //inserir erro
        console.error("Erro ao buscar marcas:", error);
    }
}

carregarMarcas()