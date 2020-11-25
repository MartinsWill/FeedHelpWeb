var idQuestionario = sessionStorage.getItem('idQuestionario')
var idLogin = parseInt(localStorage.getItem('idLogin'))
var nomeLogin = localStorage.getItem('nomeLogin')
var emailLogin = localStorage.getItem('emailLogin')
var cpfLogin = localStorage.getItem('cpfLogin')
var pontoLogin = localStorage.getItem('pontuacaoLogin')
var pontuacao = 0

var perguntas = []
var alternativaEscolhida = []

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
        perguntas.push(id)
        if (idQuestionario == questionarioId) {
            document.getElementById("perguntas").innerHTML += `
                    <h2>${titulo}</h2>
                    <p>Descrição: ${descricao}</p>
                    <input type="radio" id="${id}-1" class="input-radio" value="${alternativa_1}" name="pergunta${id}">
                    <label for="${id}-1">${alternativa_1}</label><br/>
                    <input type="radio" id="${id}-2" class="input-radio" value="${alternativa_2}" name="pergunta${id}">
                    <label for="${id}-2">${alternativa_2}</label><br/>
                    <input type="radio" id="${id}-3" class="input-radio" value="${alternativa_3}" name="pergunta${id}">
                    <label for="${id}-3">${alternativa_3}</label><br/>
                    <input type="radio" id="${id}-4" class="input-radio" value="${alternativa_4}" name="pergunta${id}">
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


function responder() {
        
        
        for(var i=0; i<perguntas.length; i++){
            console.log(perguntas[i])
            for(var x=1; x<=4; x++){
                if(document.getElementById(`${perguntas[i]}-${x}`).checked)
                    alternativaEscolhida.push(document.getElementById(`${perguntas[i]}-${x}`).value)
            }
        }
        console.log(alternativaEscolhida)

        if(perguntas.length == alternativaEscolhida.length){

            document.getElementById("spanAlert").textContent = "Cadastrado com sucesso"
            document.getElementById("spanAlert").style.color = "green"
        
            putUsuario(parseInt(pontuacao) + parseInt(pontoLogin))
                .catch(error => {
                    console.log('Houve um erro na execução do putUsuario')
                    console.error(error)
                })
        
            for(var i=0; i<perguntas.length; i++){
                postUsuarioQuestionario(perguntas[i], alternativaEscolhida[i])
                    .catch(error => {
                        console.log('Houve um erro na execução do postUsuarioQuestionario')
                        console.error(error)
                    })
            }

            setTimeout(function () {
                location.replace("../questionario/questionarioDisponiveis.html")
            }, 500); 
        
        }
        else{
            document.getElementById("spanAlert").textContent = "Todas as perguntas devem estar respondida para concluir o questionário"
            document.getElementById("spanAlert").style.color = "red"
        }
       alternativaEscolhida.length = 0
    }

async function postUsuarioQuestionario(idPergunta, alternativa) {
    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuarioid: parseInt(idLogin),
            questionarioid: parseInt(idQuestionario),
            perguntaid: parseInt(idPergunta),
            alternativaescolhida: alternativa,
        })
    };
    const response = await fetch('https://localhost:44378/api/UsuarioQuestionarios', options);
    const data = await response.json();
    console.log(data)
}

async function putUsuario(pontoFinal) {
    localStorage.setItem('pontuacaoLogin', pontoFinal)
    const options = {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: idLogin,
            nome: nomeLogin,
            cpf: cpfLogin,
            email: emailLogin,
            pontuacao: pontoFinal,
            usuariosQuestionarios: null,
            usuariosPromocoes: null,
        })
    };
    const response = await fetch(`https://localhost:44378/api/usuarios/${idLogin}`, options);
}

