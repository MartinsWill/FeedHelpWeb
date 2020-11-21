var idQuestionario = sessionStorage.getItem('idQuestionario')
var idLogin = localStorage.getItem('idLogin')
var nomeLogin = localStorage.getItem('nomeLogin')
var emailLogin = localStorage.getItem('emailLogin')
var cpfLogin = localStorage.getItem('cpfLogin')
var pontuacaoLogin = localStorage.getItem('pontuacaoLogin')
var pontuacao = 0;

async function getQuestionarios() {
    const response = await fetch('https://localhost:44378/api/questionarios');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, titulo, pontuacao_total } = element;
        if (idQuestionario == id) {
            document.getElementById("tituloQuestionario").innerHTML += titulo
            document.getElementById("potuacaoQuestionario").innerHTML += pontuacao_total
            pontuacao = pontuacao_total
        }
    });

}

getQuestionarios()
    .catch(error => {
        console.log('Houve um erro na execução do getQuestionarios')
        console.error(error)
    })

async function getPerguntas() {
    const response = await fetch('https://localhost:44378/api/perguntas');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, titulo, descricao, alternativa_1, alternativa_2, alternativa_3, alternativa_4, questionarioId } = element;
        if (idQuestionario == questionarioId) {
            document.getElementById("perguntas").innerHTML += `
                    <h2>${titulo}</h2>
                    <p>Descrição: ${descricao}</p>
                    <input type="radio" id="${id}-1" value="${alternativa_1}" name="pergunta${id}">
                    <label for="${id}-1">${alternativa_1}</label><br/>
                    <input type="radio" id="${id}-2" value="${alternativa_2}" name="pergunta${id}">
                    <label for="${id}-2">${alternativa_2}</label><br/>
                    <input type="radio" id="${id}-3" value="${alternativa_3}" name="pergunta${id}">
                    <label for="${id}-3">${alternativa_3}</label><br/>
                    <input type="radio" id="${id}-4" value="${alternativa_4}" name="pergunta${id}">
                    <label for="${id}-4">${alternativa_4}</label><br/><br/>
                    `
        }
    });

}

getPerguntas()
    .catch(error => {
        console.log('Houve um erro na execução do getPerguntas')
        console.error(error)
    })


async function postUsuarioQuestionario() {
    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuarioid: parseInt(idLogin),
            questionarioid: parseInt(idQuestionario),
        })
    };
    const response = await fetch('https://localhost:44378/api/UsuarioQuestionarios', options);
    const data = await response.json();
    console.log(data)
}

async function putUsuario() {
    const pontuacaoFinal = parseInt(pontuacao + pontuacaoLogin)
    console.log(idLogin)
    console.log(nomeLogin)
    console.log(cpfLogin)
    console.log(emailLogin)
    console.log(pontuacaoFinal)
    const options = {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parseInt(idLogin),
            nome: nomeLogin,
            cpf: cpfLogin,
            email: emailLogin,
            pontuacao: pontuacaoFinal,
        })
    };
    const response = await fetch('https://localhost:44378/api/usuarios', options);
    const data = await response.json();
    //console.log(data.id)
}

function responder() {
    document.getElementById("spanAlert").textContent = "Cadastrado com sucesso"
    document.getElementById("spanAlert").style.color = "green"

    putUsuario()
        .catch(error => {
            console.log('Houve um erro na execução do putUsuario')
            console.error(error)
        })

    postUsuarioQuestionario()
        .catch(error => {
            console.log('Houve um erro na execução do postUsuarioQuestionario')
            console.error(error)
        })

}