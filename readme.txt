📜 Senhor da Guerra
Engine v0.4.0 (Base Estável)
✅ Interface
Painel horizontal de recursos na Exploração.
Painel horizontal de recursos no Mercado.
Popups reduzidos para duas linhas.
Botão Mercado oculto até construir o primeiro Mercado.
🌾 Economia
Produção
Fazenda = +50 comida/turno.
Serraria = +60 madeira/turno.
Mina = +50 ouro/turno.
Consumo
População consome 1 comida por habitante.
Fome
Se comida chegar a 0:
perde 5 habitantes;
comida permanece em 0.
👶 Crescimento Populacional
O crescimento só acontece se houver comida suficiente e espaço nas casas.
Crescimento base
0–99 habitantes → +2
100–249 → +3
250–399 → +4
400+ → +5
Bônus das Casas
Cada 10 casas:
+1 nascimento.
Limite máximo:
8 habitantes por turno.
Consumo do nascimento
A cada crescimento:
-5 a -15 comida (aleatório).
Capacidade
150 + (casas × 25)
Se atingir o limite:
🏠 É preciso construir mais casas.
🏠 Casas
Funções:
aumentam capacidade da população;
aumentam o crescimento populacional.
🎖 Recrutas
Atualizados automaticamente.
Fórmula:
recrutas =
(população /25)
-
soldados
-
arqueiros
-
cavaleiros
Nunca ficam negativos.
⚔ Exército
Treinar soldado exige:
Quartel.
Ouro.
Comida.
Pelo menos 1 recruta.
🌲 Exploração
Necessita pelo menos 1 soldado.
Se o último soldado morrer:
exploração termina;
volta automaticamente ao reino.
Eventos atuais:
madeira;
comida;
ouro;
família;
lobos.
🪵 Madeira
Agora é utilizada em praticamente todas as construções.
🏪 Mercado
Necessita construir Mercado.
Funções:
comprar comida;
vender comida;
comprar madeira;
vender madeira.
Painel de recursos igual ao da Exploração.
📊 Recursos
Todos atualizados em tempo real:
👥
⚔
🪙
🌾
🪵
💀 Game Over
Ocorre quando:
População <= 0
Tela mostra:
Reino.
Governante.
Anos.
Turnos.
Nível (placeholder).
Pontuação (placeholder).
Botão:
🔄 Novo Jogo
(recarrega a página)
📜 Frases aleatórias
No Game Over uma frase é sorteada.
Exemplos:
📜 Seu reino entrou para a história...
💀 A última chama do reino se apagou.
👑 O reinado chegou ao fim.
🏰 As muralhas caíram.
⚔ O povo lutou bravamente...
🌾 Sem alimento...
📖 Os bardos cantarão...
🕯 O último habitante fechou os portões...
🍂 O vento sopra entre as ruínas...
🛡 Nenhum império é eterno.
📌 Roadmap v0.4.1
🌲 Exploração
Expandir para cerca de 20 eventos.
Adicionar:
🐻 Urso
🕳 Caverna
🏕 Acampamento
🍯 Mel
🍄 Cogumelos
🌿 Ervas
🦌 Caçadores
🧙 Ermitão
🏛 Ruínas
⛲ Fonte
🌉 Ponte
etc.
Com escolhas:
Lutar

Fugir

Entrar

Voltar
📅 Novo Tempo
Transformar o tempo em:
1 turno = 1 semana

4 semanas = 1 mês

4 meses = muda estação

64 turnos = 1 ano
🎲 Eventos Aleatórios
Eventos positivos:
🌾 Colheita abundante
👶 Baby boom
💰 Comerciante
🎉 Festival
⛏ Mina rica
Eventos negativos:
🔥 Incêndio
🌪 Tempestade
🦗 Praga
💀 Epidemia
🏚 Desabamento
📌 Roadmap futuro (v0.5)
Depois da 0.4.1:
🏰 Muralhas
🏹 Torres
🐎 Estábulos
⚒ Oficinas
⛪ Templos
📚 Biblioteca
Mercado avançado
Sistema de níveis
Pontuação
XP
IA inimiga
Guerras
Diplomacia
Salvamento de jogo
Eu também deixaria registrado um comentário no topo do projeto:
"Senhor da Guerra não busca ser um clone de um jogo existente. A proposta é um jogo de estratégia incremental em HTML/CSS/JavaScript, com interface retrô, mecânicas simples porém profundas e código modular, pensado para rodar até em navegadores leves e dispositivos antigos, como o NetSurf no PS2."
Esse objetivo guiou praticamente todas as decisões que tomamos até aqui e será uma ótima referência para continuarmos o projeto em qualquer novo chat.