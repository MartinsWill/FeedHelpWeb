var idLogin = parseInt(localStorage.getItem('idLogin'))
var pontoLogin = localStorage.getItem('pontuacaoLogin')

var promocoesResgatadas = []

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

        if (promocoesResgatadas.find(el => el == id)) {
            document.getElementById("promocoesResgatadas").innerHTML += `<hr></hr><div class='pDisponivel'><h4>${nome}</h4>${descricao}<br/>Custo de resgate: ${custo}</div><br/><hr></hr>`
            flag++
        }
    });
    if(flag==0) document.getElementById("promocoesResgatadas").innerHTML += `<hr></hr><div class='pDisponivel'><h4>Ainda nenhuma promoção foi resgatada</h4>Continue respondendo aos questionários para ganhar pontos e resgatar as promoções</div><br/><hr></hr>`

}


