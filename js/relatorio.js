
var usuario = [];
var questionario = [];
var pontos = [];
var pergunta = [];
var alternativa = [];


function imprime (){
    console.log('entrou no imprime')
    var text = ''
    var i=0;        
    for(i = 0; i < alternativa.length; i++){
        
        text+=`
            <tr>
            <td>${usuario[i]}</td>
            <td>${questionario[i]}</td>
            <td>${pontos[i]}</td>
            <td>${pergunta[i]}</td>
            <td>${alternativa[i]}</td>   
            </tr>`;
        
    }
    document.getElementById('tabelaRelatorio').innerHTML+=text
}


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
        const { usuarioId, questionarioId, perguntaId, alternativaEscolhida } = element
        alternativa.push(alternativaEscolhida)

        getUsuario(usuarioId)
            .catch(error => {
                console.log('Houve um erro na execução do getUsuario')
                console.error(error)
            })

        getQuestionario(questionarioId)
            .catch(error => {
                console.log('Houve um erro na execução do getUsuario')
                console.error(error)
            })

        getPerguntas(perguntaId)
            .catch(error => {
                console.log('Houve um erro na execução do getUsuario')
                console.error(error)
            })

    });


    setTimeout(function () {
        imprime()
    }, 2000); 
    
    
    
}

async function getUsuario(usuarioId) {
    const response = await fetch('https://localhost:44378/api/usuarios');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, nome } = element
        if (usuarioId == id) {
            usuario.push(nome)
        }
    });
}

async function getQuestionario(questionarioId) {
    const response = await fetch('https://localhost:44378/api/questionarios');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, titulo, pontuacao_total } = element
        if (questionarioId == id) {
            questionario.push(titulo)
            pontos.push(pontuacao_total)
        }
    });
}

async function getPerguntas(perguntaId) {
    const response = await fetch('https://localhost:44378/api/perguntas');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, titulo } = element
        if (perguntaId == id) {
            pergunta.push(titulo)
        }
    });
}
