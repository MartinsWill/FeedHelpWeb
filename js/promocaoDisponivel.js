var idLogin = parseInt(localStorage.getItem('idLogin'))
var nomeLogin = localStorage.getItem('nomeLogin')
var emailLogin = localStorage.getItem('emailLogin')
var cpfLogin = localStorage.getItem('cpfLogin')
var pontoLogin = localStorage.getItem('pontuacaoLogin')

var promocoesResgatadas = []
var pontoPromocao=0

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


async function getPromocoes() {
    const response = await fetch('https://localhost:44378/api/promocaos');
    const data = await response.json();
    var flag=0
    //console.log(data)
    data.forEach(element => {
        const { id, nome, descricao, custo } = element;

        if (!promocoesResgatadas.find(el => el == id)) {
            document.getElementById("promocoesDisponiveis").innerHTML += `<hr></hr><div class='pDisponivel' onclick='promocaoSelecionado(${id}, ${custo})'><h4>${nome}</h4>${descricao}<br/>Custo de resgate: ${custo}</div><br/><hr></hr>`
            flag++
        }
    });
    if(flag==0) document.getElementById("promocoesDisponiveis").innerHTML += `<hr></hr><div class='pDisponivel' ><h4>Nenhuma promoção disponível no momento</h4></div><br/><hr></hr>`

}


function promocaoSelecionado(id, custo) {
    if (parseInt(pontoLogin) >= parseInt(custo)) {
        if (confirm(`Deseja resgatar a promoção\nO seu saldo final será de ${parseInt(pontoLogin) - parseInt(custo)}`)) {
            pontoPromocao=custo
            postUsuarioPromocao(id)
                .catch(error => {
                    console.log('Houve um erro na execução do postUsuarioPromocao')
                    console.error(error)
                })

            putUsuario()
                .catch(error => {
                    console.log('Houve um erro na execução do putUsuario')
                    console.error(error)
                })
            //location.replace("../promocao/promocaoDisponivel.html")
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

async function putUsuario() {
    const pontuacaoFinal = parseInt(pontoLogin - pontoPromocao)
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
            usuariosQuestionarios: null,
            usuariosPromocoes: null,
        })
    };
    const response = await fetch(`https://localhost:44378/api/usuarios`, options);
    const data = await response.json();
    console.log(data.id)
}
