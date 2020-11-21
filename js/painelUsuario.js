document.getElementById("nomeUsuario").textContent = localStorage.getItem('nomeLogin')
document.getElementById("emailUsuario").textContent = localStorage.getItem('emailLogin')
document.getElementById("cpfUsuario").textContent = localStorage.getItem('cpfLogin')
document.getElementById("pontuacaoUsuario").textContent = localStorage.getItem('pontuacaoLogin')

var idLogin = parseInt(localStorage.getItem('idLogin'))
var pontoLogin = localStorage.getItem('pontuacaoLogin')

var questionarioRespondidos = []
var promocoesResgatadas = []

getUsuarioQuestionarios()
    .catch(error => {
        console.log('Houve um erro na execução do getUsuarioQuestionarios')
        console.error(error)
    })

async function getUsuarioQuestionarios() {
    const response = await fetch('https://localhost:44378/api/usuarioquestionarios');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { usuarioId, questionarioId } = element
        if (parseInt(usuarioId) == idLogin) {
            questionarioRespondidos.push(parseInt(questionarioId))
        }
    });


    getQuestionarios()
        .catch(error => {
            console.log('Houve um erro na execução do getWeather')
            console.error(error)
        })
}

getUsuarioPromocaos()
    .catch(error => {
        console.log('Houve um erro na execução do getUsuarioPromocaos')
        console.error(error)
    })

async function getUsuarioPromocaos() {
    const response = await fetch('https://localhost:44378/api/usuariopromocaos');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { usuarioId, promocaoId } = element
        if (usuarioId == idLogin) {
            promocoesResgatadas.push(parseInt(promocaoId))
        }
    });

    getPromocoes()
        .catch(error => {
            console.log('Houve um erro na execução do getPromocoes')
            console.error(error)
        })
}



function questionarioSelecionado(id) {
    sessionStorage.setItem('idQuestionario', id)
    console.log(id)
    location.replace("./respondeQuestionario.html")
}

async function getQuestionarios() {
    const response = await fetch('https://localhost:44378/api/questionarios');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, titulo, pontuacao_total } = element;

        if (questionarioRespondidos.find(el => el == id)) {
            document.getElementById("questionariosRespondidos").innerHTML += `<div class='qDisponivel'><h4>${titulo}</h4>Pontuação disponivel: ${pontuacao_total}</div><br/>`
        }
        else {
            document.getElementById("questionariosDisponiveis").innerHTML += `<div class='qDisponivel' onclick='questionarioSelecionado(${id})'><h4>${titulo}</h4>Pontuação disponivel: ${pontuacao_total}</div><br/>`
        }
    });

}

async function getPromocoes() {
    const response = await fetch('https://localhost:44378/api/promocaos');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, nome, descricao, custo } = element;

        if (promocoesResgatadas.find(el => el == id)) {
            document.getElementById("promocoesResgatadas").innerHTML += `<div class='pDisponivel'><h4>${nome}</h4>${descricao}<br/>Custo de resgate: ${custo}</div><br/>`
        }
        else {
            document.getElementById("promocoesDisponiveis").innerHTML += `<div class='pDisponivel' onclick='promocaoSelecionado(${id}, ${custo})'><h4>${nome}</h4>${descricao}<br/>Custo de resgate: ${custo}</div><br/>`
        }
    });

}


function promocaoSelecionado(id, custo) {
    if (parseInt(pontoLogin) >= parseInt(custo)) {
        if (confirm(`Deseja resgatar a promoção\nO seu saldo final será de ${parseInt(pontoLogin) - parseInt(custo)}`)) {
            postUsuarioPromocao(id)
                .catch(error => {
                    console.log('Houve um erro na execução do postUsuarioPromocao')
                    console.error(error)
                })
        }
    }
    else {
        alert("Pontos insuficientes para resgatar a promoção")
    }
}

async function postUsuarioPromocao(idPromocao) {
    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuarioid: parseInt(idLogin),
            promocaoid: parseInt(idPromocao),
        })
    };
    const response = await fetch('https://localhost:44378/api/usuariopromocaos', options);
    const data = await response.json();
    console.log(data)
}


