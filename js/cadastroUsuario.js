var cpfValor = document.getElementById('cpf').value
var emailValor = document.getElementById('email').value
var nomeValor = document.getElementById('nome').value

const verificaCadastro = () => {
    //Codico que comparação que valida se uma string contem somente números
    const numbers = /^[0-9]+$/;
    //Código de comparação que valida se a string é um email valido
    const re = /\S+@\S+\.\S+/;

    cpfValor = document.getElementById('cpf').value
    emailValor = document.getElementById('email').value
    nomeValor = document.getElementById('nome').value

    //muda a cor da span de alert para vermelho representando um erro
    document.getElementById("spanAlert").style.color = "red"

    //compara se cpf contem somente caracteres numericos
    if (!cpfValor.match(numbers)) document.getElementById("spanAlert").textContent = "CPF deve conter somente caracteres numéricos."
    //verifica se o tamanho do string do cpf é igual á 11 digitos
    else if (cpfValor.length < 11) document.getElementById("spanAlert").textContent = "O CPF deve conter 11 dígitos."

    //verifica se o campo email não esta vazio
    else if (emailValor.length <= 0) document.getElementById("spanAlert").textContent = "O Email não pode ser vazio."
    //compara o email e verifica se este é uma string de email valido
    else if (!re.test(emailValor)) document.getElementById("spanAlert").textContent = "O Email inválido"

    //verifica se o campo nome está vazio
    else if (nomeValor.length <= 0) document.getElementById("spanAlert").textContent = "O Nome não pode ser vazio"


    else {
        document.getElementById("spanAlert").textContent = "Cadastro realizado com sucesso."
        //muda a cor do span de alert para verde representando um sucesso
        document.getElementById("spanAlert").style.color = "green"

        postUsuario()
            .catch(error => {
                console.log('Houve um erro na execução do postUsuario')
                console.error(error)
            })
    }
}

async function postUsuario() {
    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeValor,
            cpf: cpfValor,
            email: emailValor,
            pontuacao: 1000,
        })
    };
    const response = await fetch('https://localhost:44378/api/usuarios', options);
    const data = await response.json();
    //console.log(data.id)
}