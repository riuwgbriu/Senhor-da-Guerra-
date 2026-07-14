// =======================================
// SENHOR DA GUERRA
// Engine v0.3.1
// =======================================

//=============
//INFLAÇÃO 
//==============

function custo(valor){

    return Math.floor(valor * (1 + ((reino.ano - 1) * 0.05)));

}


let tempoPopup;

// ==========================
// POPUP
// ==========================

function mostrarPopup(texto){

    let popup = document.getElementById("popup");

    clearTimeout(tempoPopup);

    popup.style.display = "block";
    popup.innerHTML = texto;
    popup.style.opacity = "1";

    tempoPopup = setTimeout(function(){

        popup.style.opacity = "0";

        setTimeout(function(){

            popup.style.display = "none";

        },400);

    },2000);

}
//tela de ações 

function mostrarEscolha(texto, botao1, acao1, botao2, acao2){

    let janela = document.getElementById("janelaEscolha");

    janela.style.display = "block";

    document.getElementById("textoEscolha").innerHTML = texto;

    let b1 = document.getElementById("btnEscolha1");
    let b2 = document.getElementById("btnEscolha2");

    b1.innerText = botao1;
    b2.innerText = botao2;

    b1.onclick = function(){

        janela.style.display = "none";

        acao1();

    }

    b2.onclick = function(){

        janela.style.display = "none";

        acao2();

    }

}



// ==========================
// ATUALIZA TELA
// ==========================

function atualizarTela(){

// Atualiza recrutas automaticamente
reino.recrutas = Math.floor(reino.populacao / 25) - reino.soldados - reino.arqueiros - reino.cavaleiros;

if(reino.recrutas < 0){

    reino.recrutas = 0;

}

    document.getElementById("reino").innerText = reino.nome;
    document.getElementById("governante").innerText = reino.governante;
    document.getElementById("semana").innerText = reino.semana;
   document.getElementById("mes").innerText = reino.mes;
   document.getElementById("ano").innerText = reino.ano;

if(reino.estacao == "Primavera"){

    document.getElementById("estacao").innerText = "🌸 Primavera";

}else if(reino.estacao == "Verão"){

    document.getElementById("estacao").innerText = "☀️ Verão";

}else if(reino.estacao == "Outono"){

    document.getElementById("estacao").innerText = "🍂 Outono";

}else{

    document.getElementById("estacao").innerText = "❄️ Inverno";

}
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
    
   document.getElementById("popExploracao").innerText = reino.populacao;
    document.getElementById("soldadosExploracao").innerText = reino.soldados;
   document.getElementById("ouroExploracao").innerText = formatarNumero(reino.ouro);
   document.getElementById("comidaExploracao").innerText = formatarNumero(reino.comida);
   
   document.getElementById("madeiraExploracao").innerText = formatarNumero(reino.madeira);
   document.getElementById("casas").innerText = reino.casas;
   document.getElementById("mercados").innerText = reino.mercados;
   
   document.getElementById("popMercado").innerText = reino.populacao;
  document.getElementById("soldadosMercado").innerText = reino.soldados;
  document.getElementById("ouroMercado").innerText = formatarNumero(reino.ouro);
  document.getElementById("comidaMercado").innerText = formatarNumero(reino.comida);
  document.getElementById("madeiraMercado").innerText = formatarNumero(reino.madeira);
   
   if(reino.mercados > 0){

    document.getElementById("btnMercadoTela").style.display = "block";

}else{

    document.getElementById("btnMercadoTela").style.display = "none";

}
   
}




// ==========================
// PASSAR TURNO
// ==========================




function passarTurno(mensagem = ""){

reino.turnos++;

    let resumo = "";

    // Produção
    let comidaProduzida = reino.fazendas * 50;
    let madeiraProduzida = reino.serrarias * 60;
    let ouroProduzido = reino.minas * 50;

    reino.comida += comidaProduzida;
    reino.madeira += madeiraProduzida;
    reino.ouro += ouroProduzido;

// Consumo da população
    reino.comida -= reino.populacao;

    // Fome
    if(reino.comida <= 0){

        reino.comida = 0;

        reino.populacao -= 5;

        if(reino.populacao < 0){

            reino.populacao = 0;

        }

        resumo += "💀 A fome matou 5 habitantes.<br><br>";

    }
    
    let capacidadePopulacao = 150 + (reino.casas * 25);

    // Crescimento

if(reino.populacao <= 0){

    gameOver();

    return;

}

if(
    reino.comida >= reino.populacao * 10 &&
    reino.populacao < capacidadePopulacao
){

    
// Crescimento conforme o tamanho do reino
let novosHabitantes = 2;

if(reino.populacao >= 100){
    novosHabitantes = 3;
}

if(reino.populacao >= 250){
    novosHabitantes = 4;
}

if(reino.populacao >= 400){
    novosHabitantes = 5;
}

// Bônus pelas casas
novosHabitantes += Math.floor(reino.casas / 10);

// Limite de bônus
if(novosHabitantes > 8){
    novosHabitantes = 8;
}

reino.populacao += novosHabitantes;

// Não ultrapassa a capacidade das casas
if(reino.populacao > capacidadePopulacao){
    reino.populacao = capacidadePopulacao;
}

let consumoNascimento = Math.floor(Math.random() * 11) + 5;

reino.comida -= consumoNascimento;

if(reino.comida < 0){
    reino.comida = 0;
}

resumo += "👶 Nasceram " + novosHabitantes + " novos habitantes.<br>";
resumo += "🍼 Crescimento consumiu " + consumoNascimento + " comida.<br><br>";

}

if(reino.populacao >= capacidadePopulacao){

    resumo += "🏠 É preciso construir mais casas.<br><br>";

}

// ==========================
// EVENTOS DO REINO
// ==========================

function eventoReino(){

    // 25% de chance de acontecer um evento
    if(Math.random() > 0.25){
        return "";
    }

    let evento = Math.floor(Math.random() * 32);

    switch(evento){

        case 0:

    reino.comida += 100;

    return "🌾 Colheita abundante! +100 comida";

case 1:

    reino.comida -= 80;

    if(reino.comida < 0){
        reino.comida = 0;
    }

    return "☀️ A seca reduziu as reservas. -80 comida";

case 2:

    reino.ouro += 80;

    return "⛏ Uma nova jazida foi descoberta! +80 ouro";

case 3:

    reino.madeira += 120;

    return "🌲 Lenhadores retornaram com muita madeira. +120 madeira";

case 4:

    reino.madeira -= 60;

    if(reino.madeira < 0){
        reino.madeira = 0;
    }

    return "🔥 Um incêndio destruiu parte da madeira. -60 madeira";

case 5:

    reino.ouro -= 50;

    if(reino.ouro < 0){
        reino.ouro = 0;
    }

    return "💸 Gastos inesperados atingiram o tesouro. -50 ouro";

case 6:

    reino.comida += 60;
    reino.ouro += 40;

    return "🏪 Comerciantes enriqueceram o reino. +60 comida | +40 ouro";

case 7:

    reino.comida += 40;
    reino.madeira += 40;

    return "🌧 Chuvas favoreceram as colheitas e as florestas.";
    
    
    case 8:

    reino.ouro -= 100;

    if(reino.ouro < 0){
        reino.ouro = 0;
    }

    resumo += "🏴 Bandidos roubaram 100 de ouro.<br><br>";

break;

case 9:

    reino.populacao -= 10;

    if(reino.populacao < 0){
        reino.populacao = 0;
    }

    resumo += "🦠 Uma epidemia matou 10 habitantes.<br><br>";

break;

case 10:

    reino.comida -= 200;

    if(reino.comida < 0){
        reino.comida = 0;
    }

    resumo += "🐀 Uma praga destruiu parte dos celeiros.<br><br>";

break;

case 11:

    reino.madeira -= 150;

    if(reino.madeira < 0){
        reino.madeira = 0;
    }

    resumo += "🔥 Um incêndio consumiu 150 de madeira.<br><br>";

break;

case 12:

    resumo += "🎭 Um grupo de artistas visitou o reino.<br><br>";

break;

case 13:

    reino.ouro += 80;

    reino.comida += 80;

    resumo += "🚚 Uma caravana trouxe riquezas ao reino.<br><br>";

break;

case 14:

    reino.populacao += 5;

    resumo += "👨‍🌾 Famílias migraram para o reino.<br><br>";

break;

case 15:

    reino.ouro += 150;

    resumo += "💰 Um antigo imposto foi finalmente pago.<br><br>";

break;

case 16:

    reino.comida += 300;
    resumo += "🌧 Chuvas favoreceram as plantações. +300 comida.<br><br>";

break;

case 17:

    reino.ouro += 250;
    resumo += "💎 Uma nova jazida de ouro foi descoberta. +250 ouro.<br><br>";

break;

case 18:

    reino.madeira += 250;
    resumo += "🌲 Lenhadores encontraram uma floresta abundante. +250 madeira.<br><br>";

break;

case 19:

    reino.populacao += 15;
    resumo += "👨‍🌾 Migrantes chegaram ao reino. +15 habitantes.<br><br>";

break;

case 20:

    reino.ouro -= 200;
    if(reino.ouro < 0) reino.ouro = 0;
    resumo += "💸 Funcionários corruptos desviaram recursos. -200 ouro.<br><br>";

break;

case 21:

    reino.comida -= 300;
    if(reino.comida < 0) reino.comida = 0;
    resumo += "🦗 Uma praga destruiu parte das plantações. -300 comida.<br><br>";

break;

case 22:

    reino.madeira -= 200;
    if(reino.madeira < 0) reino.madeira = 0;
    resumo += "🌪 Uma tempestade derrubou árvores e construções. -200 madeira.<br><br>";

break;

case 23:

    reino.populacao -= 20;
    if(reino.populacao < 0) reino.populacao = 0;
    resumo += "😷 Uma doença espalhou-se pelo reino. -20 habitantes.<br><br>";

break;

case 24:

    resumo += "🎭 Um grande festival animou o povo.<br><br>";

break;

case 25:

    resumo += "☄ Um cometa cruzou os céus durante a noite.<br><br>";

break;

case 26:

    resumo += "🧙 Um velho sábio passou pela capital compartilhando histórias.<br><br>";

break;

case 27:

    resumo += "📜 Emissários de um reino distante trouxeram notícias do mundo.<br><br>";

break;

case 28:

    reino.ouro += 100;
    reino.comida += 100;
    resumo += "🤝 Comerciantes fecharam excelentes negócios. +100 ouro e +100 comida.<br><br>";

break;

case 29:

    reino.comida += 150;
    reino.madeira += 150;
    resumo += "🌿 A natureza foi generosa nesta estação. +150 comida e +150 madeira.<br><br>";

break;

case 30:

    reino.ouro += 80;
    reino.populacao += 8;
    resumo += "👶 Um período de prosperidade atraiu novos moradores. +8 habitantes e +80 ouro.<br><br>";

break;

case 31:

    resumo += "🕊 O reino viveu uma semana tranquila, sem acontecimentos importantes.<br><br>";

break;
    
    }

    return "";

}



//================
//PROXIMA ESTAÇÃO 
//=================
document.getElementById("btnEstacao").onclick = function(){

    for(let i = 0; i < 16; i++){

        passarTurno();

    }

};

// ==========================
// SISTEMA DE TEMPO
// ==========================

reino.semana++;

if (reino.semana > 4) {

    reino.semana = 1;
    reino.mes++;

    if (reino.mes > 4) {

        reino.mes = 1;

        if (reino.estacao == "Primavera") {

            reino.estacao = "Verão";

        } else if (reino.estacao == "Verão") {

            reino.estacao = "Outono";

        } else if (reino.estacao == "Outono") {

            reino.estacao = "Inverno";

        } else {

            reino.estacao = "Primavera";
            reino.ano++;

        }

    }

}

let evento = eventoReino();

if(evento != ""){

    resumo += "<br>📜 <b>Evento do Reino</b><br>";
    resumo += evento + "<br><br>";

}



atualizarTela();

resumo += "🌾 +" + comidaProduzida + " comida<br>";
resumo += "🪵 +" + madeiraProduzida + " madeira<br>";
resumo += "🪙 +" + ouroProduzido + " ouro<br><br>";

let iconeEstacao = "🌸";

if(reino.estacao == "Verão"){

    iconeEstacao = "☀️";

}else if(reino.estacao == "Outono"){

    iconeEstacao = "🍂";

}else if(reino.estacao == "Inverno"){

    iconeEstacao = "❄️";

}

resumo += iconeEstacao + " " + reino.estacao + " • Mês " + reino.mes;


document.getElementById("resumoTurno").innerHTML = resumo;

if(mensagem == ""){

    mostrarPopup("⏳ Turno concluído!");

}else{

    mostrarPopup(mensagem + "<br>⏳ +1 Turno");

}

}




// ==========================
// GAME OVER
// ==========================

function gameOver(){

    let frases = [

        "📜 Seu reino entrou para a história... mas não sobreviveu ao tempo.",

        "💀 A última chama do reino se apagou.",

        "👑 O reinado chegou ao fim. Apenas lendas permanecem.",

        "🏰 As muralhas caíram e o reino foi abandonado.",

        "⚔ O povo lutou bravamente, mas a fome venceu.",

        "🌾 Sem alimento, não houve esperança para o reino.",

        "📖 Os bardos cantarão sobre a ascensão e a queda deste reino.",

        "🕯 O último habitante fechou os portões para sempre.",

        "🍂 O vento agora sopra entre as ruínas do antigo reino.",

        "🛡 Nenhum império é eterno."

    ];

    let frase = frases[Math.floor(Math.random() * frases.length)];

    document.getElementById("goFrase").innerText = frase;

    document.getElementById("goReino").innerText = reino.nome;

    document.getElementById("goGovernante").innerText = reino.governante;

    document.getElementById("goAnos").innerText = reino.ano;

    document.getElementById("goTurnos").innerText = reino.turnos;

    document.getElementById("game").style.display = "none";

    document.getElementById("gameOver").style.display = "block";

}


// ==========================
// MENU
// ==========================

document.getElementById("btnIniciar").onclick = function(){

    document.getElementById("menu").style.display = "none";
    document.getElementById("novoReino").style.display = "block";

};


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


// ==========================
// CONSTRUÇÕES
// ==========================

document.getElementById("btnConstrucoes").onclick = function(){

    document.getElementById("game").style.display = "none";
    document.getElementById("construcoes").style.display = "block";

};


document.getElementById("btnVoltarConstrucoes").onclick = function(){

    document.getElementById("construcoes").style.display = "none";
    document.getElementById("game").style.display = "block";

};

// Construir Fazenda
document.getElementById("btnFazenda").onclick = function(){

let custoOuro = custo(50);
let custoMadeira = custo(20);

if(reino.ouro >= custoOuro && reino.madeira >= custoMadeira){

        reino.ouro -= custoOuro;
        reino.madeira -= custoMadeira;
        reino.fazendas++;

        atualizarTela();

       mostrarPopup("🌾 Fazenda construída!<br>🪙 -50 Ouro<br>🪵 -20 Madeira");

    }else{

        mostrarPopup("❌ Ouro ou madeira insuficientes!");

    }

};


// Construir Serraria
document.getElementById("btnSerraria").onclick = function(){

    if(reino.ouro >= 80 && reino.madeira >= 40){

        reino.ouro -= 80;
        reino.madeira -= 40;
        reino.serrarias++;

        atualizarTela();

        mostrarPopup("🪵 Serraria construída!<br>🪙 -80 Ouro<br>🪵 -40 Madeira");

    }else{

        mostrarPopup("❌ Ouro ou madeira insuficientes!");

    }

};

// Construir Casa
document.getElementById("btnCasa").onclick = function(){

if(reino.ouro >= 50 && reino.madeira >= 100){

        reino.ouro -= 50;
        reino.madeira -= 100;

        reino.casas++;

        atualizarTela();

        mostrarPopup("🏠 Casa construída!<br>🪙 -50 Ouro<br>🪵 -100 Madeira");

    }else{

        mostrarPopup("❌ Ouro ou madeira insuficientes!");

    }

};


// Construir Mina
document.getElementById("btnMina").onclick = function(){

  if(reino.ouro >= 150 && reino.madeira >= 60){

        reino.ouro -= 150;
        reino.madeira -= 60;
        reino.minas++;

        atualizarTela();

        mostrarPopup("⛏ Mina construída!<br>🪙 -150 Ouro<br>🪵 -60 Madeira");

    }else{

        mostrarPopup("❌ Ouro ou madeira insuficientes!");

    }

};


// Construir Quartel
document.getElementById("btnQuartel").onclick = function(){

  if(reino.ouro >= 120 && reino.madeira >= 80){

        reino.ouro -= 120;
        reino.madeira -= 80;
        reino.quarteis++;

        atualizarTela();

        mostrarPopup("🏹 Quartel construído!<br>🪙 -120 Ouro<br>🪵 -80 Madeira");

    }else{

        mostrarPopup("❌ Ouro ou madeira insuficientes!");

    }

};

// Construir Mercado
document.getElementById("btnMercado").onclick = function(){

    if(reino.ouro >= 200 && reino.madeira >= 100){

        reino.ouro -= 200;
        reino.madeira -= 100;

        reino.mercados++;
        
        document.getElementById("btnMercadoTela").style.display = "block";

        atualizarTela();

        mostrarPopup("🏪 Mercado construído!<br>🪙 -200 Ouro<br>🪵 -100 Madeira");

    }else{

        mostrarPopup("❌ Ouro ou madeira insuficientes!");

    }

};



// ==========================
// BOTÃO PRÓXIMO TURNO
// ==========================

document.getElementById("btnTurno").onclick = function(){

    passarTurno();

};


// ==========================
// EXÉRCITO
// ==========================

document.getElementById("btnExercito").onclick = function(){

    document.getElementById("game").style.display = "none";
    document.getElementById("exercito").style.display = "block";

};


document.getElementById("btnVoltarExercito").onclick = function(){

    document.getElementById("exercito").style.display = "none";
    document.getElementById("game").style.display = "block";

};


document.getElementById("btnTreinar").onclick = function(){

    if(reino.quarteis <= 0){

        mostrarPopup("❌ Construa um Quartel primeiro!");
        return;

    }

if(reino.recrutas <= 0){

    mostrarPopup("❌ Não há recrutas disponíveis!");
    return;

}

    if(reino.ouro >= 20 && reino.comida >= 10){

        reino.ouro -= 20;
        reino.comida -= 10;

        reino.soldados++;

        atualizarTela();

        mostrarPopup("⚔ Soldado treinado!<br>👤 -1 recruta");

    }else{

        mostrarPopup("❌ Recursos insuficientes!");

    }

};


// ==========================
// EXPLORAÇÃO
// ==========================

document.getElementById("btnExploracao").onclick = function(){

    if(reino.soldados <= 0){

        mostrarPopup("⚔ Você precisa de pelo menos 1 soldado!");
        return;

    }

    document.getElementById("game").style.display = "none";
    document.getElementById("exploracao").style.display = "block";

};


document.getElementById("btnVoltarExploracao").onclick = function(){

    document.getElementById("exploracao").style.display = "none";
    document.getElementById("game").style.display = "block";

};

// ==========================
// MERCADO
// ==========================

// Abrir Mercado
document.getElementById("btnMercadoTela").onclick = function(){

    if(reino.mercados <= 0){

        mostrarPopup("❌ Construa um Mercado primeiro!");

        return;

    }

    document.getElementById("game").style.display = "none";
    document.getElementById("mercado").style.display = "block";

};

// Voltar
document.getElementById("btnVoltarMercado").onclick = function(){

    document.getElementById("mercado").style.display = "none";
    document.getElementById("game").style.display = "block";

};

//comprar comida

document.getElementById("btnComprarComida").onclick = function(){

    if(reino.ouro >= 50){

        reino.ouro -= 50;
        reino.comida += 100;

        atualizarTela();

        mostrarPopup("🌾 Você comprou 100 de comida!");

    }else{

        mostrarPopup("❌ Ouro insuficiente!");

    }

};


//comprar madeira

document.getElementById("btnComprarMadeira").onclick = function(){

    if(reino.ouro >= 60){

        reino.ouro -= 60;
        reino.madeira += 100;

        atualizarTela();

        mostrarPopup("🪵 Você comprou 100 de madeira!");

    }else{

        mostrarPopup("❌ Ouro insuficiente!");

    }

};


//vender comida

document.getElementById("btnVenderComida").onclick = function(){

    if(reino.comida >= 100){

        reino.comida -= 100;
        reino.ouro += 30;

        atualizarTela();

        mostrarPopup("🌾 Você vendeu 100 de comida!");

    }else{

        mostrarPopup("❌ Comida insuficiente!");

    }

};

//vender madeira

document.getElementById("btnVenderMadeira").onclick = function(){

    if(reino.madeira >= 100){

        reino.madeira -= 100;
        reino.ouro += 40;

        atualizarTela();

        mostrarPopup("🪵 Você vendeu 100 de madeira!");

    }else{

        mostrarPopup("❌ Madeira insuficiente!");

    }

};

// ==========================
// EVENTOS DA FLORESTA
// ==========================





// ==========================
// FLORESTA
// ==========================

document.getElementById("btnFloresta").onclick = function(){

    if(reino.soldados <= 0){

        mostrarPopup("⚔ Sua expedição não possui soldados!");

        document.getElementById("exploracao").style.display = "none";
        document.getElementById("game").style.display = "block";

        return;

    }

    let evento = Math.floor(Math.random() * 16);

    switch(evento){

        case 0:

            reino.madeira += 100;

            passarTurno("🌲 Você encontrou 100 de madeira!");

            break;

        case 1:

            reino.comida += 50;

            passarTurno("🍓 Você encontrou frutas silvestres! +50 comida");

            break;

        case 2:

            reino.ouro += 30;

            passarTurno("💰 Você encontrou um pequeno tesouro! +30 ouro");

            break;

        case 3:

            reino.populacao += 3;

            passarTurno("👨‍🌾 Uma família juntou-se ao reino! +3 habitantes");

            break;

        case 4:

            reino.soldados--;

            if(reino.soldados <= 0){

                reino.soldados = 0;

                atualizarTela();

                passarTurno("🐺 Lobos atacaram! Seu último soldado morreu.");

                document.getElementById("exploracao").style.display = "none";
                document.getElementById("game").style.display = "block";

            }else{

                passarTurno("🐺 Lobos atacaram! Você perdeu 1 soldado.");

            }

            break;

        case 5:

            reino.comida += 80;

            passarTurno("🍯 Você encontrou uma colmeia! +80 comida");

            break;

        case 6:

            reino.madeira += 150;

            passarTurno("🪵 Lenhadores lhe deram 150 madeira.");

            break;

        case 7:

            reino.ouro += 80;

            passarTurno("💎 Você encontrou um baú escondido! +80 ouro");

            break;

        case 8:

            reino.comida += 30;

            passarTurno("🍄 Você encontrou cogumelos comestíveis. +30 comida");

            break;

        case 9:

            mostrarEscolha(

                "🐻 Um enorme urso apareceu!",

                "⚔ Lutar",

                function(){

                    if(Math.random() < 0.5){

                        reino.comida += 100;

                        passarTurno("🐻 Você derrotou o urso!");

                    }else{

    reino.soldados = 0;

    atualizarTela();

    document.getElementById("exploracao").style.display = "none";
    document.getElementById("game").style.display = "block";

    passarTurno("💀 O urso derrotou sua expedição! Todos os soldados morreram.");

}
                },

                "🏃 Fugir",

                function(){

                    passarTurno("🏃 Sua expedição fugiu.");

                }

            );

            break;
            
            
case 10:

mostrarEscolha(

"🕳 Você encontrou uma caverna escura.",

"🚶 Entrar",

function(){

    if(Math.random() < 0.5){

        reino.ouro += 120;

        passarTurno("💰 Você encontrou um tesouro escondido!");

    }else{

        reino.soldados = 0;

        atualizarTela();

        document.getElementById("exploracao").style.display="none";
        document.getElementById("game").style.display="block";

        passarTurno("💀 A caverna desabou sobre sua expedição.");

    }

},

"⬅ Voltar",

function(){

    passarTurno("🚶 Você decidiu não entrar.");

}

);

break;

case 11:

mostrarEscolha(

"🌉 Uma velha ponte bloqueia o caminho.",

"Atravessar",

function(){

    if(Math.random()<0.5){

        reino.ouro+=80;

        passarTurno("💰 Do outro lado havia um baú!");

    }else{

        reino.soldados--;

        if(reino.soldados<0){

            reino.soldados=0;

        }

        passarTurno("💀 A ponte cedeu! -1 soldado");

    }

},

"Voltar",

function(){

    passarTurno("Você voltou pelo caminho seguro.");

}

);

break;

case 12:

mostrarEscolha(

"🏛 Antigas ruínas foram encontradas.",

"Explorar",

function(){

    reino.ouro+=100;

    reino.madeira+=80;

    passarTurno("🏺 Você encontrou antigos recursos.");

},

"Ignorar",

function(){

    passarTurno("Você ignorou as ruínas.");

}

);

break;


case 13:

reino.comida+=120;

passarTurno("🌳 Um bosque repleto de frutas alimentou sua expedição.");

break;


case 14:

mostrarEscolha(

"🧙 Um velho ermitão deseja conversar.",

"Conversar",

function(){

    reino.ouro+=50;

    reino.comida+=50;

    passarTurno("🧙 O ermitão compartilhou suprimentos.");

},

"Ignorar",

function(){

    passarTurno("Você seguiu viagem.");

}

);

break;

case 15:

mostrarEscolha(

"⚔ Saqueadores cercaram sua expedição!",

"Lutar",

function(){

    if(Math.random()<0.5){

        reino.ouro+=150;

        passarTurno("⚔ Você derrotou os saqueadores!");

    }else{

        reino.soldados=0;

        atualizarTela();

        document.getElementById("exploracao").style.display="none";
        document.getElementById("game").style.display="block";

        passarTurno("💀 Os saqueadores derrotaram sua expedição.");

    }

},

"Fugir",

function(){

    passarTurno("🏃 Sua expedição conseguiu escapar.");

}

);

break;



    }

};



// ==========================
// MONTANHA
// ==========================

document.getElementById("btnMontanha").onclick = function(){

    if(reino.soldados <= 0){

        mostrarPopup("⚔ Sua expedição não possui soldados!");

        document.getElementById("exploracao").style.display = "none";
        document.getElementById("game").style.display = "block";

        return;

    }

    let evento = Math.floor(Math.random() * 16);

    switch(evento){

        // ==========================
        // 0 - VEIO DE OURO
        // ==========================

        case 0:

            reino.ouro += 120;

            passarTurno("⛏ Você encontrou um rico veio de ouro! +120 Ouro");

            break;

        // ==========================
        // 1 - CRISTAIS
        // ==========================

        case 1:

            reino.ouro += 200;

            passarTurno("💎 Cristais raros foram encontrados! +200 Ouro");

            break;

        // ==========================
        // 2 - CABRA SELVAGEM
        // ==========================

        case 2:

            mostrarEscolha(

                "🐐 Uma cabra selvagem apareceu.",

                "🏹 Caçar",

                function(){

                    reino.comida += 60;

                    passarTurno("🥩 A caça foi um sucesso! +60 comida");

                },

                "🚶 Deixar ir",

                function(){

                    passarTurno("🐐 A cabra fugiu pelas montanhas.");

                }

            );

            break;

        // ==========================
        // 3 - ERVAS MEDICINAIS
        // ==========================

        case 3:

            reino.comida += 40;

            passarTurno("🌿 Você encontrou ervas e frutas da montanha. +40 comida");

            break;
            
                    // ==========================
        // 4 - DESLIZAMENTO
        // ==========================

        case 4:

            mostrarEscolha(

                "🪨 Um deslizamento de pedras começou!",

                "🏃 Correr",

                function(){

                    if(Math.random() < 0.5){

                        passarTurno("🏃 A expedição escapou do deslizamento!");

                    }else{

                        reino.soldados--;

                        if(reino.soldados < 0){

                            reino.soldados = 0;

                        }

                        passarTurno("🪨 Um soldado foi atingido pelas pedras.");

                    }

                },

                "⬅ Recuar",

                function(){

                    passarTurno("↩ A expedição retornou em segurança.");

                }

            );

            break;

        // ==========================
        // 5 - PENHASCO
        // ==========================

        case 5:

            mostrarEscolha(

                "🕳 Um enorme penhasco bloqueia o caminho.",

                "🌉 Atravessar",

                function(){

                    if(Math.random() < 0.5){

                        reino.ouro += 100;

                        passarTurno("💰 Do outro lado havia um antigo tesouro!");

                    }else{

                        reino.soldados = 0;

                        atualizarTela();

                        document.getElementById("exploracao").style.display = "none";
                        document.getElementById("game").style.display = "block";

                        passarTurno("💀 A expedição caiu no penhasco.");

                    }

                },

                "🚶 Voltar",

                function(){

                    passarTurno("↩ Você decidiu voltar.");

                }

            );

            break;

        // ==========================
        // 6 - ABUTRES
        // ==========================

        case 6:

            reino.comida -= 40;

            if(reino.comida < 0){

                reino.comida = 0;

            }

            passarTurno("🦅 Abutres roubaram parte dos suprimentos.");

            break;

        // ==========================
        // 7 - LOBO DA MONTANHA
        // ==========================

        case 7:

            mostrarEscolha(

                "🐺 Um enorme lobo da montanha apareceu!",

                "⚔ Lutar",

                function(){

                    if(Math.random() < 0.5){

                        reino.comida += 80;

                        passarTurno("🐺 O lobo foi derrotado! +80 comida");

                    }else{

                        reino.soldados--;

                        if(reino.soldados < 0){

                            reino.soldados = 0;

                        }

                        passarTurno("💀 O lobo feriu sua expedição.");

                    }

                },

                "🏃 Fugir",

                function(){

                    passarTurno("🏃 A expedição escapou.");

                }

            );

            break;
            
                    // ==========================
        // 8 - LADRÕES
        // ==========================

        case 8:

            mostrarEscolha(

                "🥷 Ladrões bloquearam a passagem!",

                "⚔ Lutar",

                function(){

                    if(Math.random() < 0.5){

                        reino.ouro += 150;

                        passarTurno("⚔ Você derrotou os ladrões! +150 ouro");

                    }else{

                        reino.soldados = 0;

                        atualizarTela();

                        document.getElementById("exploracao").style.display = "none";
                        document.getElementById("game").style.display = "block";

                        passarTurno("💀 Os ladrões derrotaram sua expedição.");

                    }

                },

                "🏃 Fugir",

                function(){

                    passarTurno("🏃 Você conseguiu escapar.");

                }

            );

            break;

        // ==========================
        // 9 - MONGE
        // ==========================

        case 9:

            mostrarEscolha(

                "🧙 Um velho monge oferece ajuda.",

                "Aceitar",

                function(){

                    reino.comida += 50;
                    reino.ouro += 50;

                    passarTurno("🙏 O monge compartilhou seus suprimentos.");

                },

                "Recusar",

                function(){

                    passarTurno("🚶 Você agradeceu e continuou a jornada.");

                }

            );

            break;

        // ==========================
        // 10 - ACAMPAMENTO
        // ==========================

        case 10:

            mostrarEscolha(

                "🏕 Você encontrou um acampamento abandonado.",

                "Revistar",

                function(){

                    if(Math.random() < 0.5){

                        reino.comida += 100;

                        passarTurno("🍖 Restaram muitas provisões!");

                    }else{

                        reino.ouro += 80;

                        passarTurno("🎒 Você encontrou equipamentos valiosos.");

                    }

                },

                "Descansar",

                function(){

                    reino.comida += 20;

                    passarTurno("🔥 A expedição descansou antes de seguir.");

                }

            );

            break;

        // ==========================
        // 11 - EXPLORADOR PERDIDO
        // ==========================

        case 11:

            mostrarEscolha(

                "🧗 Um explorador perdido pede ajuda.",

                "Ajudar",

                function(){

                    reino.ouro += 100;

                    passarTurno("😊 O explorador recompensou sua bondade.");

                },

                "Ignorar",

                function(){

                    passarTurno("🚶 Você continuou sua viagem.");

                }

            );

            break;
            
                    // ==========================
        // 12 - VILAREJO
        // ==========================

        case 12:

            mostrarEscolha(

                "🏘 Um pequeno vilarejo foi encontrado.",

                "🍞 Comprar comida",

                function(){

                    if(reino.ouro >= 40){

                        reino.ouro -= 40;
                        reino.comida += 100;

                        passarTurno("🍞 Você comprou suprimentos.");

                    }else{

                        mostrarPopup("❌ Ouro insuficiente.");

                    }

                },

                "🚶 Continuar",

                function(){

                    passarTurno("🚶 A expedição seguiu viagem.");

                }

            );

            break;

        // ==========================
        // 13 - MOSTEIRO
        // ==========================

        case 13:

            mostrarEscolha(

                "⛪ Monges recebem viajantes no mosteiro.",

                "💰 Doar 50 ouro",

                function(){

                    if(reino.ouro >= 50){

                        reino.ouro -= 50;

                        passarTurno("🙏 Os monges abençoaram sua jornada.");

                    }else{

                        mostrarPopup("❌ Ouro insuficiente.");

                    }

                },

                "🚶 Ir embora",

                function(){

                    passarTurno("Você agradeceu e continuou.");

                }

            );

            break;

        // ==========================
        // 14 - ÁGUIA-DOURADA
        // ==========================

        case 14:

            mostrarEscolha(

                "🦅 Uma águia-dourada sobrevoa os penhascos.",

                "👀 Seguir",

                function(){

                    reino.ouro += 120;

                    passarTurno("🪺 A águia levou você até um tesouro escondido!");

                },

                "🚶 Ignorar",

                function(){

                    passarTurno("A águia desapareceu entre as montanhas.");

                }

            );

            break;

               // ==========================
        // 15 - TEMPLO ANTIGO
        // ==========================

        case 15:

            mostrarEscolha(

                "🏛 Um antigo templo foi descoberto.",

                "🔦 Explorar",

                function(){

                    if(Math.random() < 0.5){

                        reino.ouro += 250;

                        passarTurno("💰 Você encontrou um antigo tesouro!");

                    }else{

                        reino.soldados--;

                        if(reino.soldados < 0){

                            reino.soldados = 0;

                        }

                        passarTurno("⚠ Armadilhas feriram sua expedição.");

                    }

                },

                "🚶 Ir embora",

                function(){

                    passarTurno("Você decidiu não arriscar.");

                }

            );

            break;

    }

};

// ==========================
// RIO
// ==========================

document.getElementById("btnRio").onclick = function(){

    if(reino.soldados <= 0){

        mostrarPopup("⚔ Sua expedição não possui soldados!");

        document.getElementById("exploracao").style.display="none";
        document.getElementById("game").style.display="block";

        return;

    }

    let evento = Math.floor(Math.random()*16);

    switch(evento){

// ==========================
// 0 - PESCA
// ==========================

case 0:

    reino.comida += 80;

    passarTurno("🎣 A pesca foi excelente! +80 comida");

break;

// ==========================
// 1 - BARQUEIRO
// ==========================

case 1:

mostrarEscolha(

"🚣 Um barqueiro oferece ajuda.",

"Aceitar",

function(){

    reino.ouro += 50;

    passarTurno("🚣 O barqueiro mostrou um atalho com tesouros.");

},

"Recusar",

function(){

    passarTurno("Você continuou pela margem.");

}

);

break;

// ==========================
// 2 - JACARÉ
// ==========================

case 2:

mostrarEscolha(

"🐊 Um jacaré enorme surgiu!",

"Lutar",

function(){

    if(Math.random()<0.5){

        reino.comida +=100;

        passarTurno("🐊 O jacaré virou alimento.");

    }else{

        reino.soldados--;

        if(reino.soldados<0){

            reino.soldados=0;

        }

        passarTurno("🐊 Um soldado ficou ferido.");

    }

},

"Fugir",

function(){

    passarTurno("🏃 Você escapou do jacaré.");

}

);

break;

// ==========================
// 3 - BAÚ BOIANDO
// ==========================

case 3:

    reino.ouro +=120;

    passarTurno("📦 Um baú boiava no rio! +120 ouro");

break;

// ==========================
// 4 - ILHA
// ==========================

case 4:

mostrarEscolha(

"🏝 Uma pequena ilha apareceu.",

"Explorar",

function(){

    reino.comida +=70;

    reino.ouro +=50;

    passarTurno("🏝 A ilha escondia recursos.");

},

"Ignorar",

function(){

    passarTurno("Você seguiu navegando.");

}

);

break;

// ==========================
// 5 - BARCO NAUFRAGADO
// ==========================

case 5:

    reino.ouro +=150;

    passarTurno("🚢 Um barco naufragado escondia riquezas.");

break;

// ==========================
// 6 - PATOS
// ==========================

case 6:

    reino.comida +=50;

    passarTurno("🦆 Você caçou alguns patos.");

break;

// ==========================
// 7 - PESCADORES
// ==========================

case 7:

mostrarEscolha(

"🎣 Pescadores oferecem comida.",

"Comprar",

function(){

    if(reino.ouro>=30){

        reino.ouro-=30;

        reino.comida+=120;

        passarTurno("🍖 Você comprou peixes frescos.");

    }else{

        mostrarPopup("❌ Ouro insuficiente.");

    }

},

"Recusar",

function(){

    passarTurno("Você agradeceu e foi embora.");

}

);

break;

// ==========================
// 8 - PONTE
// ==========================

case 8:

mostrarEscolha(

"🌉 Uma velha ponte cruza o rio.",

"Atravessar",

function(){

    if(Math.random()<0.5){

        reino.ouro +=100;

        passarTurno("💰 Havia um baú do outro lado!");

    }else{

        reino.soldados--;

        if(reino.soldados<0){

            reino.soldados=0;

        }

        passarTurno("💀 A ponte cedeu! Você perdeu um soldado.");

    }

},

"Voltar",

function(){

    passarTurno("🚶 Você voltou pela margem.");

}

);

break;

// ==========================
// 9 - JUNCOS
// ==========================

case 9:

reino.madeira +=80;

passarTurno("🌿 Você coletou juncos e madeira flutuante.");

break;

// ==========================
// 10 - MOEDAS
// ==========================

case 10:

reino.ouro +=90;

passarTurno("🪙 Moedas antigas foram encontradas no fundo do rio.");

break;

// ==========================
// 11 - COMERCIANTE
// ==========================

case 11:

mostrarEscolha(

"🛶 Um comerciante está navegando.",

"Negociar",

function(){

    reino.comida +=80;
    reino.ouro -=20;

    passarTurno("🤝 Você fez um bom negócio.");

},

"Ignorar",

function(){

    passarTurno("O comerciante seguiu viagem.");

}

);

break;

// ==========================
// 12 - LONTRAS
// ==========================

case 12:

reino.comida +=60;

passarTurno("🦦 Lontras indicaram um ótimo local para pesca.");

break;

// ==========================
// 13 - NASCENTE
// ==========================

case 13:

reino.comida +=40;

passarTurno("💧 A água pura renovou a expedição.");

break;

// ==========================
// 14 - ARCO-ÍRIS
// ==========================

case 14:

reino.ouro +=200;

passarTurno("🌈 No fim do arco-íris havia um pequeno tesouro!");

break;

// ==========================
// 15 - ENCHENTE
// ==========================

case 15:

mostrarEscolha(

"🌊 O rio começou a transbordar!",

"Escapar",

function(){

    if(Math.random()<0.5){

        passarTurno("🏃 A expedição escapou da enchente.");

    }else{

        reino.soldados=0;

        atualizarTela();

        document.getElementById("exploracao").style.display="none";
        document.getElementById("game").style.display="block";

        passarTurno("💀 A enchente levou toda a expedição.");

    }

},

"Esperar",

function(){

    passarTurno("🌧 Após algumas horas a água baixou.");

}

);

break;

    }

};

// ==========================
// RUÍNAS
// ==========================


document.getElementById("btnRuinas").onclick = function(){

    if(reino.soldados <= 0){

        mostrarPopup("⚔ Sua expedição não possui soldados!");

        document.getElementById("exploracao").style.display="none";
        document.getElementById("game").style.display="block";

        return;

    }

    let evento = Math.floor(Math.random()*16);

    switch(evento){

// ==========================
// 0 - BAÚ ANTIGO
// ==========================

case 0:

    reino.ouro += 180;

    passarTurno("📦 Um antigo baú escondia 180 de ouro!");

break;

// ==========================
// 1 - ESTÁTUA
// ==========================

case 1:

mostrarEscolha(

"🗿 Uma antiga estátua chama sua atenção.",

"Examinar",

function(){

    reino.ouro += 80;

    passarTurno("💰 Uma joia estava escondida na estátua.");

},

"Ignorar",

function(){

    passarTurno("Você continuou explorando.");

}

);

break;

// ==========================
// 2 - ARMADILHA
// ==========================

case 2:

mostrarEscolha(

"⚠ Uma armadilha foi acionada!",

"Correr",

function(){

    if(Math.random()<0.5){

        passarTurno("🏃 A expedição escapou.");

    }else{

        reino.soldados--;

        if(reino.soldados<0){

            reino.soldados=0;

        }

        passarTurno("💀 Um soldado ficou ferido.");

    }

},

"Proteger-se",

function(){

    passarTurno("🛡 A armadilha foi evitada.");

}

);

break;

// ==========================
// 3 - BIBLIOTECA
// ==========================

case 3:

    reino.ouro += 50;

    passarTurno("📚 Manuscritos antigos foram vendidos por 50 ouro.");

break;

// ==========================
// 4 - ESQUELETO
// ==========================

case 4:

mostrarEscolha(

"💀 Um antigo guerreiro guarda a passagem.",

"Lutar",

function(){

    if(Math.random()<0.5){

        reino.ouro +=120;

        passarTurno("⚔ O guardião foi derrotado.");

    }else{

        reino.soldados--;

        if(reino.soldados<0){

            reino.soldados=0;

        }

        passarTurno("💀 O guardião feriu sua expedição.");

    }

},

"Recuar",

function(){

    passarTurno("Você voltou em segurança.");

}

);

break;

// ==========================
// 5 - ALTAR
// ==========================

case 5:

    reino.comida += 60;

    passarTurno("⛪ O altar guardava provisões esquecidas.");

break;

// ==========================
// 6 - PASSAGEM
// ==========================

case 6:

mostrarEscolha(

"🚪 Uma passagem secreta foi encontrada.",

"Entrar",

function(){

    reino.ouro +=150;

    passarTurno("💰 A passagem escondia um tesouro.");

},

"Fechar",

function(){

    passarTurno("Você decidiu não arriscar.");

}

);

break;

// ==========================
// 7 - MÚMIA
// ==========================

case 7:

mostrarEscolha(

"🧟 Uma múmia desperta!",

"Lutar",

function(){

    if(Math.random()<0.5){

        reino.ouro +=200;

        passarTurno("🏺 A múmia protegia um grande tesouro!");

    }else{

        reino.soldados=0;

        atualizarTela();

        document.getElementById("exploracao").style.display="none";
        document.getElementById("game").style.display="block";

        passarTurno("💀 A múmia derrotou toda a expedição.");

    }

},

"Fugir",

function(){

    passarTurno("🏃 A expedição escapou das ruínas.");

}

);

break;

// ==========================
// 8 - COFRE
// ==========================

case 8:

    reino.ouro += 250;

    passarTurno("💰 Um antigo cofre escondia uma fortuna!");

break;

// ==========================
// 9 - AVENTUREIRO
// ==========================

case 9:

mostrarEscolha(

"🧭 Um aventureiro perdido pede ajuda.",

"Ajudar",

function(){

    reino.ouro += 100;
    reino.comida += 50;

    passarTurno("🤝 O aventureiro recompensou sua bondade.");

},

"Ignorar",

function(){

    passarTurno("Você seguiu explorando as ruínas.");

}

);

break;

// ==========================
// 10 - SALÃO DO REI
// ==========================

case 10:

mostrarEscolha(

"👑 Você encontrou o antigo salão do rei.",

"Explorar",

function(){

    if(Math.random() < 0.5){

        reino.ouro += 300;

        passarTurno("👑 O tesouro real foi encontrado!");

    }else{

        reino.soldados--;

        if(reino.soldados < 0){

            reino.soldados = 0;

        }

        passarTurno("⚠ Guardas antigos protegeram o salão.");

    }

},

"Sair",

function(){

    passarTurno("Você deixou o salão para trás.");

}

);

break;

// ==========================
// 11 - POÇO
// ==========================

case 11:

mostrarEscolha(

"🕳 Um poço muito antigo foi encontrado.",

"Descer",

function(){

    reino.ouro += 180;

    passarTurno("💰 No fundo havia antigas relíquias.");

},

"Ignorar",

function(){

    passarTurno("Você continuou explorando.");

}

);

break;

// ==========================
// 12 - FANTASMA
// ==========================

case 12:

mostrarEscolha(

"👻 Um fantasma aparece nas ruínas.",

"Ouvir",

function(){

    reino.ouro += 120;

    passarTurno("👻 O espírito revelou um esconderijo secreto.");

},

"Fugir",

function(){

    passarTurno("🏃 Você fugiu assustado.");

}

);

break;

// ==========================
// 13 - TESOURO ESCONDIDO
// ==========================

case 13:

    reino.ouro += 220;

    passarTurno("💎 Um tesouro escondido foi descoberto!");

break;

// ==========================
// 14 - ARMADILHA MORTAL
// ==========================

case 14:

mostrarEscolha(

"☠ Uma enorme armadilha bloqueia a saída!",

"Correr",

function(){

    if(Math.random() < 0.5){

        passarTurno("🏃 A expedição escapou por pouco!");

    }else{

        reino.soldados = 0;

        atualizarTela();

        document.getElementById("exploracao").style.display="none";
        document.getElementById("game").style.display="block";

        passarTurno("💀 Toda a expedição foi perdida nas ruínas.");

    }

},

"Esperar",

function(){

    passarTurno("⌛ A armadilha parou após alguns instantes.");

}

);

break;

// ==========================
// 15 - RELÍQUIA ANTIGA
// ==========================

case 15:

mostrarEscolha(

"🏺 Uma antiga relíquia foi encontrada.",

"Levar",

function(){

    reino.ouro += 350;

    passarTurno("🏆 A relíquia foi vendida por uma fortuna!");

},

"Deixar",

function(){

    passarTurno("Você preferiu não tocar na relíquia.");

}

);

break;

    }

};




//botao novo jgo
document.getElementById("btnNovoJogo").onclick = function(){

    location.reload();

};

//formatar números 

function formatarNumero(valor){

    if(valor >= 1000000){

        return Math.floor(valor / 1000000) + "M";

    }

    if(valor >= 1000){

        return Math.floor(valor / 1000) + "K";

    }

    return valor;

}


