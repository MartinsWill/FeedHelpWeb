var custoValor = document.getElementById('custo').value
var descricaoValor = document.getElementById('descricao').value
var nomeValor = document.getElementById('nome').value

const verificaCadastro = () => {

    custoValor = document.getElementById('custo').value
    descricaoValor = document.getElementById('descricao').value
    nomeValor = document.getElementById('nome').value

    //muda a cor da span de alert para vermelho representando um erro
    document.getElementById("spanAlert").style.color = "red"


    //verifica se o campo nome está vazio
    if (nomeValor.length <= 0) document.getElementById("spanAlert").textContent = "O Nome não pode ser vazio"

    //verifica se o campo nome está vazio
    else if (custoValor == "") document.getElementById("spanAlert").textContent = "O Custo não pode ser vazio"
    else if (custoValor <= 0) document.getElementById("spanAlert").textContent = "O Custo tem que ser maior que zero"


    else {
        document.getElementById("spanAlert").textContent = "Cadastro realizado com sucesso"
        //muda a cor do span de alert para verde representando um sucesso
        document.getElementById("spanAlert").style.color = "green"

        postPromocao()
            .catch(error => {
                console.log('Houve um erro na execução do postPromocao')
                console.error(error)
            })

        setTimeout(function () {
            location.replace("painelADM.html")
        }, 500); 
    }
}

async function postPromocao() {
    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeValor,
            descricao: descricaoValor,
            custo: parseInt(custoValor),
        })
    };
    const response = await fetch('https://localhost:44378/api/promocaos', options);
    const data = await response.json();
    //console.log(data.id)
}