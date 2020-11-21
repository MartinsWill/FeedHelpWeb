var idLogin = parseInt(localStorage.getItem('idLogin'))

var questionarioRespondidos = []

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
                console.log('Houve um erro na execução do getQuestionarios')
                console.error(error)
            })
}

async function getQuestionarios() {
    const response = await fetch('https://localhost:44378/api/questionarios');
    const data = await response.json();

    //console.log(data)
    data.forEach(element => {
        const { id, titulo, pontuacao_total } = element;
        if (questionarioRespondidos.find(el => el == id)) {
            document.getElementById("questionariosRespondidos").innerHTML+=`<hr></hr><div class='qRespondidos'><h4>${titulo}</h4>Pontuação disponivel: ${pontuacao_total}</div><hr></hr>`
        }
    });

}
