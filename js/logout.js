/*if(localStorage.getItem("idLogin")===null){
    location.replace("./index.html")
}*/

function logout(){
    localStorage.removeItem('idLogin')
    localStorage.removeItem('nomeLogin')
    localStorage.removeItem('emailLogin')
    localStorage.removeItem('cpfLogin')
    localStorage.removeItem('pontuacaoLogin')

    location.replace("../index.html")
}