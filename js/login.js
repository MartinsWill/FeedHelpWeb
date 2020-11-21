var cpfValor = document.getElementById('cpf').value
var emailValor = document.getElementById('email').value

const validaLogin = () => {
    //Codico que comparação que valida se uma string contem somente números
    const numbers = /^[0-9]+$/;
    //Código de comparação que valida se a string é um email valido
    const re = /\S+@\S+\.\S+/;

    cpfValor = document.getElementById('cpf').value
    emailValor = document.getElementById('email').value

    //muda a cor da span de alert para vermelho representando um erro
    document.getElementById("spanAlert").style.color = "red"

    //compara se cpf contem somente caracteres numericos
    if (!cpfValor.match(numbers)) document.getElementById("spanAlert").innerHTML = "CPF deve conter somente caracteres numéricos."
    //verifica se o tamanho do string do cpf é igual á 11 digitos
    else if (cpfValor.length < 11) document.getElementById("spanAlert").textContent = "O CPF deve conter 11 dígitos."

    //verifica se o campo email não esta vazio
    else if (emailValor.length <= 0) document.getElementById("spanAlert").textContent = "O Email não pode ser vazio."
    //compara o email e verifica se este é uma string de email valido
    else if (!re.test(emailValor)) document.getElementById("spanAlert").textContent = "O Email inválido."



    else {
        getUsuario()
            .catch(error => {
                console.log('Houve um erro na execução do getWeather')
                console.error(error)
            })
    }


}

async function getUsuario() {
    const response = await fetch('https://localhost:44378/api/usuarios');
    const data = await response.json();


    //console.log(data)

    data.forEach(element => {
        const { id, nome, email, cpf, pontuacao } = element;
        if (email == emailValor && cpf == cpfValor) {

            localStorage.setItem('idLogin', id)
            localStorage.setItem('nomeLogin', nome)
            localStorage.setItem('emailLogin', email)
            localStorage.setItem('cpfLogin', cpf)
            localStorage.setItem('pontuacaoLogin', pontuacao)

            //alert('Login realizado com sucesso.\n Bem vindo'+nome)
            location.replace("./painelUsuario.html")
            console.log(element)
        }
        else {
            document.getElementById("spanAlert").textContent = 'Nenhum usuário encontrado para a identificação fornecida'
        }
    });

}



