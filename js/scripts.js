async function apiCar() {
    const urlPadrao = `https://parallelum.com.br/fipe/api/v1/carros/marcas`
    const marcaSelect = document.getElementById("marca") //ele pega o id do select
    const modeloSelect = document.getElementById("modelo") //ele pega o id do modelo
    const anoSelect = document.getElementById("ano") //ele pega o id do modelo
    const valorCarro = document.getElementById("valor")

    let codMarca;
    let codModelo;
    let codAno;

    try {
        const response = await fetch(urlPadrao); //cria requisição com a url
        const marcas = await response.json(); //transforma a response em json

        marcaSelect.innerHTML = "<option value=''>Selecione uma marca</option>"; // insere o item no html

        marcas.forEach(marca => {
            const option = document.createElement("option"); //criar um elemento opções
            option.value = marca.codigo; //valor do codigo
            option.textContent = marca.nome; //nome inserido
            marcaSelect.appendChild(option);//atribuir  o select com as opções
        });

        marcaSelect.addEventListener("change", async (e) => { //addEventListener ele captura uma ação que nesse caso é alterar
            modeloSelect.innerHTML = "<option value=''>Selecione um modelo</option>";
            anoSelect.innerHTML = "<option value=''>Selecione um ano</option>";
            valorCarro.innerHTML = ""; // Limpa o valor do carro
            
            codMarca = e.target.value //pegando o valor do evendo "e"
            const response = await fetch(`${urlPadrao}/${codMarca}/modelos`); //cria requisição com a url
            const modelos = await response.json(); //transforma a response em json
            
            modeloSelect.innerHTML = "<option value=''>Selecione uma modelo</option>"; // insere o item no html

            modelos.modelos.forEach(modelo => {
                const optionModelo = document.createElement("option"); //criar um elemento opções
                optionModelo.value = modelo.codigo; //valor do codigo
                optionModelo.textContent = modelo.nome; //nome inserido
                modeloSelect.appendChild(optionModelo);//atribuir  o select com as opções
            });
        });
        
        modeloSelect.addEventListener("change", async (e) => { //addEventListener ele captura uma ação que nesse caso é alterar
            codModelo = e.target.value //pegando o valor do evendo "e"
            const response = await fetch(`${urlPadrao}/${codMarca}/modelos/${codModelo}/anos`); //cria requisição com a url
            const anos = await response.json(); //transforma a response em json

            anoSelect.innerHTML = "<option value=''>Selecione uma ano</option>"; // insere o item no html

            anos.forEach(ano => {
                const optionAno = document.createElement("option"); //criar um elemento opções
                optionAno.value = ano.codigo; //valor do codigo
                optionAno.textContent = ano.nome; //nome inserido
                anoSelect.appendChild(optionAno);//atribuir  o select com as opções
            });
        });

        anoSelect.addEventListener("change", async (e) => { //addEventListener ele captura uma ação que nesse caso é alterar
            codAno = e.target.value //pegando o valor do evendo "e"
            const response = await fetch(`${urlPadrao}/${codMarca}/modelos/${codModelo}/anos/${codAno}`); //cria requisição com a url
            const Valor = await response.json(); //transforma a response em json

            const resultadoValor = Valor.Valor
            valorCarro.innerHTML = resultadoValor; // insere o item no html
        });

    } catch (error) {
        marcaSelect.innerHTML = "<option value=''>Erro ao carregar marcas</option>"; //inserir erro
        console.error("Erro ao buscar:", error);
    }
}


apiCar()