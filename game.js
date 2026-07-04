// Mostra uma notificação na tela
function mostrarPopup(texto){

    let popup = document.getElementById("popup");

    popup.innerHTML = texto;

    popup.style.opacity = "1";

    setTimeout(function(){

        popup.style.opacity = "0";

    },2000);

}

// Atualiza todas as informações da tela
function atualizarTela(){

    document.getElementById("reino").innerText = reino.nome;
    document.getElementById("governante").innerText = reino.governante;
    document.getElementById("ano").innerText = reino.ano;
    document.getElementById("estacao").innerText = reino.estacao;
    document.getElementById("pop").innerText = reino.populacao;
    document.getElementById("ouro").innerText = reino.ouro;
    document.getElementById("comida").innerText = reino.comida;
    document.getElementById("madeira").innerText = reino.madeira;

    document.getElementById("fazendas").innerText = reino.fazendas;
    document.getElementById("serrarias").innerText = reino.serrarias;
    document.getElementById("minas").innerText = reino.minas;
    document.getElementById("quarteis").innerText = reino.quarteis;

    document.getElementById("recrutas").innerText = reino.recrutas;
    document.getElementById("soldados").innerText = reino.soldados;
    document.getElementById("arqueiros").innerText = reino.arqueiros;
    document.getElementById("cavaleiros").innerText = reino.cavaleiros;

}

// Botão INICIAR
document.getElementById("btnIniciar").onclick = function(){

    document.getElementById("menu").style.display = "none";
    document.getElementById("novoReino").style.display = "block";

};

// Botão CONTINUAR
document.getElementById("btnContinuar").onclick = function(){

    reino.nome = document.getElementById("nomeReino").value.trim();
    reino.governante = document.getElementById("nomePlayer").value.trim();

    if(reino.nome == ""){
        reino.nome = "Lopes";
    }

    if(reino.governante == ""){
        reino.governante = "Governante";
    }

    atualizarTela();

    document.getElementById("novoReino").style.display = "none";
    document.getElementById("game").style.display = "block";

};

// Abrir Construções
document.getElementById("btnConstrucoes").onclick = function(){

    document.getElementById("game").style.display = "none";
    document.getElementById("construcoes").style.display = "block";

};

// Voltar Construções
document.getElementById("btnVoltarConstrucoes").onclick = function(){

    document.getElementById("construcoes").style.display = "none";
    document.getElementById("game").style.display = "block";

};

// Construir Fazenda
document.getElementById("btnFazenda").onclick = function(){

    if(reino.ouro >= 50){

        reino.ouro -= 50;
        reino.fazendas++;

        atualizarTela();

        mostrarPopup("🌾 Fazenda construída!<br>🪙 -50 Ouro");

    }else{

        mostrarPopup("❌ Ouro insuficiente!");

    }

};

// Construir Serraria
document.getElementById("btnSerraria").onclick = function(){

    if(reino.ouro >= 80){

        reino.ouro -= 80;
        reino.serrarias++;

        atualizarTela();

        mostrarPopup("🪵 Serraria construída!<br>🪙 -80 Ouro");

    }else{

        mostrarPopup("❌ Ouro insuficiente!");

    }

};

// Construir Mina
document.getElementById("btnMina").onclick = function(){

    if(reino.ouro >= 150){

        reino.ouro -= 150;
        reino.minas++;

        atualizarTela();

        mostrarPopup("⛏ Mina construída!<br>🪙 -150 Ouro");

    }else{

        mostrarPopup("❌ Ouro insuficiente!");

    }

};

// Construir Quartel
document.getElementById("btnQuartel").onclick = function(){

    if(reino.ouro >= 120){

        reino.ouro -= 120;
        reino.quarteis++;

        atualizarTela();

        mostrarPopup("🏹 Quartel construído!<br>🪙 -120 Ouro");

    }else{

        mostrarPopup("❌ Ouro insuficiente!");

    }

};

// Próximo Turno
document.getElementById("btnTurno").onclick = function(){

    let resumo = "";

    // Produção
    let comidaProduzida = reino.fazendas * 80;
    let madeiraProduzida = reino.serrarias * 60;
    let ouroProduzido = reino.minas * 50;

    reino.comida += comidaProduzida;
    reino.madeira += madeiraProduzida;
    reino.ouro += ouroProduzido;

    // Consumo
    reino.comida -= reino.populacao;

    // Fome
    if(reino.comida <= 0){

        reino.comida = 0;

        reino.populacao -= 5;

        if(reino.populacao < 0){
            reino.populacao = 0;
        }

        resumo += "💀 A fome matou 5 habitantes.<br><br>";

        mostrarPopup("💀 A fome matou 5 habitantes!");

    }

    // Estações
    if(reino.estacao == "Primavera"){

        reino.estacao = "Verão";

    }else if(reino.estacao == "Verão"){

        reino.estacao = "Outono";

    }else if(reino.estacao == "Outono"){

        reino.estacao = "Inverno";

    }else{

        reino.estacao = "Primavera";
        reino.ano++;

    }

    atualizarTela();

    resumo += "🌾 +" + comidaProduzida + " comida<br>";
    resumo += "🪵 +" + madeiraProduzida + " madeira<br>";
    resumo += "🪙 +" + ouroProduzido + " ouro<br><br>";

    resumo += "📅 " + reino.estacao + "<br>";
    resumo += "📖 Ano " + reino.ano;

    document.getElementById("resumoTurno").innerHTML = resumo;

    mostrarPopup("⏳ Turno concluído!");

};

// Abrir Exército
document.getElementById("btnExercito").onclick = function(){

    document.getElementById("game").style.display = "none";
    document.getElementById("exercito").style.display = "block";

};

// Voltar Exército
document.getElementById("btnVoltarExercito").onclick = function(){

    document.getElementById("exercito").style.display = "none";
    document.getElementById("game").style.display = "block";

};

// Treinar Soldado
document.getElementById("btnTreinar").onclick = function(){

    if(reino.quarteis <= 0){

        mostrarPopup("❌ Construa um Quartel primeiro!");
        return;

    }

    if(reino.ouro >= 20 && reino.comida >= 10){

        reino.ouro -= 20;
        reino.comida -= 10;

        reino.soldados++;

        atualizarTela();

        mostrarPopup("⚔ Soldado treinado!");

    }else{

        mostrarPopup("❌ Recursos insuficientes!");

    }

};