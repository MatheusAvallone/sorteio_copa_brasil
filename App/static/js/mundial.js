// Dados dos grupos e times do Mundial de Clubes FIFA 2025
const mundialGrupos = [
  {
    nome: 'Grupo A',
    times: ['Palmeiras', 'Porto', 'Al Ahly', 'Inter Miami'],
  },
  {
    nome: 'Grupo B',
    times: ['Paris Saint-Germain', 'Atlético de Madrid', 'Botafogo', 'Seattle Sounders'],
  },
  {
    nome: 'Grupo C',
    times: ['Bayern Munich', 'Auckland City', 'Boca Juniors', 'Benfica'],
  },
  {
    nome: 'Grupo D',
    times: ['Flamengo', 'Esperance', 'Chelsea', 'LAFC/Club América'],
  },
  {
    nome: 'Grupo E',
    times: ['River Plate', 'Urawa Red Diamonds', 'Monterrey', 'Inter'],
  },
  {
    nome: 'Grupo F',
    times: ['Fluminense', 'Borussia Dortmund', 'Ulsan Hyundai', 'Mamelodi Sundowns'],
  },
  {
    nome: 'Grupo G',
    times: ['Manchester City', 'Wydad AC', 'Al Ain', 'Juventus'],
  },
  {
    nome: 'Grupo H',
    times: ['Real Madrid', 'Al Hilal', 'Pachuca', 'FC Salzburg'],
  },
];

// Gera os jogos da fase de grupos (todos contra todos, turno único, 3 rodadas)
function gerarJogosGrupoRodadas(times) {
  // Ordem padrão de rodadas igual ao GE
  return [
    [ // Rodada 1
      { timeA: times[0], timeB: times[1], golsA: '', golsB: '' },
      { timeA: times[2], timeB: times[3], golsA: '', golsB: '' },
    ],
    [ // Rodada 2
      { timeA: times[0], timeB: times[2], golsA: '', golsB: '' },
      { timeA: times[1], timeB: times[3], golsA: '', golsB: '' },
    ],
    [ // Rodada 3
      { timeA: times[0], timeB: times[3], golsA: '', golsB: '' },
      { timeA: times[1], timeB: times[2], golsA: '', golsB: '' },
    ],
  ];
}

// Estado dos grupos e jogos
const grupos = mundialGrupos.map(g => ({
  nome: g.nome,
  times: g.times.map(t => ({ nome: t, pts: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 })),
  rodadas: gerarJogosGrupoRodadas(g.times),
  rodadaAtual: 0,
}));

// Estado do mata-mata
let mataMata = {
  fase: 'oitavas', // oitavas, quartas, semis, final
  jogos: [],
  rodadaAtual: 0
};

// Gera os jogos das oitavas de final
function gerarOitavas() {
  const classificados = grupos.map(g => g.times.slice(0, 2)).flat();
  const jogos = [];
  
  // Primeiro colocado do grupo A vs Segundo do grupo B
  jogos.push({
    timeA: grupos[0].times[0].nome,
    timeB: grupos[1].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  // Primeiro colocado do grupo B vs Segundo do grupo A
  jogos.push({
    timeA: grupos[1].times[0].nome,
    timeB: grupos[0].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  // Primeiro colocado do grupo C vs Segundo do grupo D
  jogos.push({
    timeA: grupos[2].times[0].nome,
    timeB: grupos[3].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  // Primeiro colocado do grupo D vs Segundo do grupo C
  jogos.push({
    timeA: grupos[3].times[0].nome,
    timeB: grupos[2].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  // Primeiro colocado do grupo E vs Segundo do grupo F
  jogos.push({
    timeA: grupos[4].times[0].nome,
    timeB: grupos[5].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  // Primeiro colocado do grupo F vs Segundo do grupo E
  jogos.push({
    timeA: grupos[5].times[0].nome,
    timeB: grupos[4].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  // Primeiro colocado do grupo G vs Segundo do grupo H
  jogos.push({
    timeA: grupos[6].times[0].nome,
    timeB: grupos[7].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  // Primeiro colocado do grupo H vs Segundo do grupo G
  jogos.push({
    timeA: grupos[7].times[0].nome,
    timeB: grupos[6].times[1].nome,
    golsA: '',
    golsB: ''
  });
  
  return jogos;
}

// Gera os jogos das quartas de final
function gerarQuartas() {
  const jogos = [];
  const vencedores = mataMata.jogos.map(jogo => {
    const golsA = parseInt(jogo.golsA);
    const golsB = parseInt(jogo.golsB);
    return golsA > golsB ? jogo.timeA : jogo.timeB;
  });
  
  // Primeiro vencedor vs Segundo vencedor
  jogos.push({
    timeA: vencedores[0],
    timeB: vencedores[1],
    golsA: '',
    golsB: ''
  });
  
  // Terceiro vencedor vs Quarto vencedor
  jogos.push({
    timeA: vencedores[2],
    timeB: vencedores[3],
    golsA: '',
    golsB: ''
  });
  
  // Quinto vencedor vs Sexto vencedor
  jogos.push({
    timeA: vencedores[4],
    timeB: vencedores[5],
    golsA: '',
    golsB: ''
  });
  
  // Sétimo vencedor vs Oitavo vencedor
  jogos.push({
    timeA: vencedores[6],
    timeB: vencedores[7],
    golsA: '',
    golsB: ''
  });
  
  return jogos;
}

// Gera os jogos das semifinais
function gerarSemifinais() {
  const jogos = [];
  const vencedores = mataMata.jogos.map(jogo => {
    const golsA = parseInt(jogo.golsA);
    const golsB = parseInt(jogo.golsB);
    return golsA > golsB ? jogo.timeA : jogo.timeB;
  });
  
  // Primeiro vencedor vs Segundo vencedor
  jogos.push({
    timeA: vencedores[0],
    timeB: vencedores[1],
    golsA: '',
    golsB: ''
  });
  
  // Terceiro vencedor vs Quarto vencedor
  jogos.push({
    timeA: vencedores[2],
    timeB: vencedores[3],
    golsA: '',
    golsB: ''
  });
  
  return jogos;
}

// Gera o jogo da final
function gerarFinal() {
  const vencedores = mataMata.jogos.map(jogo => {
    const golsA = parseInt(jogo.golsA);
    const golsB = parseInt(jogo.golsB);
    return golsA > golsB ? jogo.timeA : jogo.timeB;
  });
  
  return [{
    timeA: vencedores[0],
    timeB: vencedores[1],
    golsA: '',
    golsB: ''
  }];
}

// Gera o jogo da disputa do 3º lugar
function gerarTerceiroLugar() {
  const perdedores = mataMata.jogos.map(jogo => {
    const golsA = parseInt(jogo.golsA);
    const golsB = parseInt(jogo.golsB);
    return golsA < golsB ? jogo.timeA : jogo.timeB;
  });
  
  return [{
    timeA: perdedores[0],
    timeB: perdedores[1],
    golsA: '',
    golsB: ''
  }];
}

// Função utilitária para gerar datas, horários e locais reais dos EUA para os jogos
function obterDataHoraJogo(grupoIdx, rodada, jogoIdx) {
  // Exemplo: cada rodada é um dia diferente, jogos às 16:00 e 19:00
  const baseDate = new Date(2025, 5, 14 + rodada); // Junho (mês 5)
  const hora = jogoIdx === 0 ? 16 : 19;
  baseDate.setHours(hora, 0, 0, 0);
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const diaSemana = diasSemana[baseDate.getDay()];
  const dia = baseDate.getDate().toString().padStart(2, '0');
  const mes = (baseDate.getMonth() + 1).toString().padStart(2, '0');
  const dataStr = `${dia}/${mes}`;
  const horaStr = `${hora}:00`;
  // Estádios reais dos EUA
  const estadios = [
    'MetLife Stadium', // New Jersey
    'SoFi Stadium', // Los Angeles
    "Levi's Stadium", // San Francisco
    'Mercedes-Benz Stadium', // Atlanta
    'Hard Rock Stadium', // Miami
    'AT&T Stadium', // Dallas
    'Gillette Stadium', // Boston
    'Lumen Field', // Seattle
    'Lincoln Financial Field', // Philadelphia
    'NRG Stadium' // Houston
  ];
  // Alterna entre estádios para cada grupo e jogo
  const local = estadios[(grupoIdx * 2 + jogoIdx) % estadios.length];
  return { data: dataStr, hora: horaStr, diaSemana, local };
}

// Renderiza os grupos em blocos (tabela + jogos da rodada ao lado)
function renderGruposBlocos() {
  const gruposDiv = document.getElementById('mundial-grupos');
  gruposDiv.innerHTML = '';
  grupos.forEach((grupo, idx) => {
    const bloco = document.createElement('div');
    bloco.className = 'bloco-grupo';
    bloco.style.marginBottom = '2.5rem';
    // Tabela
    const tabelaDiv = document.createElement('div');
    tabelaDiv.className = 'grupo';
    tabelaDiv.innerHTML = `<h2>${grupo.nome}</h2>` + tabelaGrupoHTML(grupo);
    // Linha divisória
    const divisoria = document.createElement('div');
    divisoria.className = 'divisoria-grupo-ge';
    // Jogos da rodada
    const jogosDiv = document.createElement('div');
    jogosDiv.className = 'grupo-jogos';
    // Navegação de rodadas
    const rodadaJogos = grupo.rodadas[grupo.rodadaAtual].map((jogo, jIdx) => {
      const info = obterDataHoraJogo(idx, grupo.rodadaAtual, jIdx);
      return `
        <div class="calendario-jogo-ge">
          <div class="jogo-info-ge">
            <span class="jogo-local-ge">${info.local}</span><br/>
            <span class="jogo-data-ge">${info.diaSemana} ${info.data} - ${info.hora}</span>
          </div>
          <div class="linha-jogo-ge">
            <span class="time-nome-ge">${jogo.timeA}</span>
            <input class="placar-ge" type="number" min="0" value="${jogo.golsA}" data-grupo="${idx}" data-rodada="${grupo.rodadaAtual}" data-jogo="${jIdx}" data-time="A" />
            <span class="versus-ge">x</span>
            <input class="placar-ge" type="number" min="0" value="${jogo.golsB}" data-grupo="${idx}" data-rodada="${grupo.rodadaAtual}" data-jogo="${jIdx}" data-time="B" />
            <span class="time-nome-ge">${jogo.timeB}</span>
          </div>
        </div>
      `;
    }).join('');
    jogosDiv.innerHTML = `
      <div class="rodada-nav-ge">
        <button class="seta-rodada" data-grupo="${idx}" data-dir="-1" ${grupo.rodadaAtual === 0 ? 'disabled' : ''}>&#8592;</button>
        <span class="rodada-titulo-ge">${grupo.rodadaAtual + 1}ª RODADA</span>
        <button class="seta-rodada" data-grupo="${idx}" data-dir="1" ${grupo.rodadaAtual === 2 ? 'disabled' : ''}>&#8594;</button>
      </div>
      <div class="rodada-jogos">
        ${rodadaJogos}
      </div>
    `;
    bloco.appendChild(tabelaDiv);
    bloco.appendChild(divisoria);
    bloco.appendChild(jogosDiv);
    gruposDiv.appendChild(bloco);
  });
  
  // Eventos dos inputs
  document.querySelectorAll('.grupo-jogos input[type="number"]').forEach(input => {
    input.addEventListener('input', onPlacarChange);
  });
  
  // Eventos das setas de rodada
  document.querySelectorAll('.seta-rodada').forEach(btn => {
    btn.addEventListener('click', e => {
      const grupoIdx = parseInt(btn.dataset.grupo);
      const dir = parseInt(btn.dataset.dir);
      grupos[grupoIdx].rodadaAtual += dir;
      renderGruposBlocos();
      atualizarBotaoAvancar();
    });
  });
}

// Renderiza os jogos do mata-mata
function renderMataMata() {
  const mataMataDiv = document.getElementById('mundial-mata-mata');
  mataMataDiv.style.display = 'block';
  
  let html = `<div class="mata-mata-container">
    <h2>${mataMata.fase.toUpperCase()}</h2>
    <div class="mata-mata-jogos">`;
  
  mataMata.jogos.forEach((jogo, idx) => {
    html += `
      <div class="mata-mata-jogo">
        <span class="time-nome">${jogo.timeA}</span>
        <input type="number" min="0" value="${jogo.golsA}" data-jogo="${idx}" data-time="A" />
        <span class="versus">x</span>
        <input type="number" min="0" value="${jogo.golsB}" data-jogo="${idx}" data-time="B" />
        <span class="time-nome">${jogo.timeB}</span>
      </div>
    `;
  });
  
  html += `</div></div>`;
  mataMataDiv.innerHTML = html;
  
  // Eventos dos inputs
  document.querySelectorAll('.mata-mata-jogos input[type="number"]').forEach(input => {
    input.addEventListener('input', onMataMataPlacarChange);
  });
}

// Checa se todos os jogos da fase de grupos estão preenchidos
function todosJogosPreenchidos() {
  return grupos.every(grupo => 
    grupo.rodadas.every(rodada => 
      rodada.every(jogo => 
        jogo.golsA !== '' && jogo.golsB !== ''
      )
    )
  );
}

// Lógica do botão avançar
function atualizarBotaoAvancar() {
  const btnAvancar = document.getElementById('btn-avancar');
  const todosPreenchidos = todosJogosPreenchidos();
  console.log('Todos jogos preenchidos:', todosPreenchidos); // Debug
  btnAvancar.disabled = !todosPreenchidos;
}

// Função para manter a posição da página
function manterPosicaoPagina() {
  const scrollAtual = window.scrollY;
  window.scrollTo(0, scrollAtual);
}

// Função para adicionar eventos de prevenção de scroll
function addPreventScrollEvents() {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    // Remove eventos anteriores para evitar duplicação
    input.removeEventListener('focus', manterPosicaoPagina);
    input.removeEventListener('input', manterPosicaoPagina);
    input.removeEventListener('click', manterPosicaoPagina);
    
    // Adiciona os novos eventos
    input.addEventListener('focus', manterPosicaoPagina);
    input.addEventListener('input', manterPosicaoPagina);
    input.addEventListener('click', manterPosicaoPagina);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  grupos.forEach(grupo => atualizarTabelaGrupoRodadas(grupo));
  renderGruposBlocos();
  atualizarBotaoAvancar();
  
  // Adiciona eventos de prevenção de scroll inicialmente
  addPreventScrollEvents();
  
  // Adiciona evento de scroll para manter a posição
  window.addEventListener('scroll', manterPosicaoPagina);
  
  document.getElementById('btn-avancar').addEventListener('click', () => {
    console.log('Botão avançar clicado');
    
    if (mataMata.fase === 'oitavas') {
      console.log('Gerando oitavas...');
      mataMata.jogos = gerarOitavas();
      mataMata.fase = 'quartas';
    } else if (mataMata.fase === 'quartas') {
      console.log('Gerando quartas...');
      mataMata.jogos = gerarQuartas();
      mataMata.fase = 'semis';
    } else if (mataMata.fase === 'semis') {
      console.log('Gerando semifinais...');
      mataMata.jogos = gerarSemifinais();
      mataMata.fase = 'terceiro';
    } else if (mataMata.fase === 'terceiro') {
      console.log('Gerando disputa do 3º lugar...');
      mataMata.jogos = gerarTerceiroLugar();
      mataMata.fase = 'final';
    } else if (mataMata.fase === 'final') {
      console.log('Final do torneio!');
      const vencedor = parseInt(mataMata.jogos[0].golsA) > parseInt(mataMata.jogos[0].golsB) 
        ? mataMata.jogos[0].timeA 
        : mataMata.jogos[0].timeB;
      alert(`🏆 ${vencedor} é o CAMPEÃO DO MUNDIAL DE CLUBES 2025! 🏆`);
      return;
    }
    
    renderMataMata();
    atualizarTituloFase();
    document.getElementById('mundial-grupos').style.display = 'none';
    document.getElementById('btn-voltar').style.visibility = 'visible';
  });
});

// Atualiza placar e tabela
function onPlacarChange(e) {
  const input = e.target;
  const gIdx = parseInt(input.dataset.grupo);
  const rodada = parseInt(input.dataset.rodada);
  const jIdx = parseInt(input.dataset.jogo);
  const time = input.dataset.time;
  
  // Permite apenas números de 0 a 99
  let val = input.value;
  if (val !== '') {
    val = Math.min(99, Math.max(0, parseInt(val) || 0));
    input.value = val;
  }
  
  grupos[gIdx].rodadas[rodada][jIdx][time === 'A' ? 'golsA' : 'golsB'] = val;
  
  // Atualiza apenas a tabela do grupo atual
  const tabelaDiv = document.querySelector(`.bloco-grupo:nth-child(${gIdx + 1}) .grupo`);
  if (tabelaDiv) {
    atualizarTabelaGrupoRodadas(grupos[gIdx]);
    tabelaDiv.innerHTML = `<h2>${grupos[gIdx].nome}</h2>` + tabelaGrupoHTML(grupos[gIdx]);
  }
  
  atualizarBotaoAvancar();
}

// Atualiza a tabela do grupo considerando todas as rodadas
function atualizarTabelaGrupoRodadas(grupo) {
  grupo.times.forEach(t => {
    t.pts = t.v = t.e = t.d = t.gp = t.gc = t.sg = 0;
  });
  grupo.rodadas.flat().forEach(jogo => {
    if (jogo.golsA !== '' && jogo.golsB !== '') {
      const a = grupo.times.find(t => t.nome === jogo.timeA);
      const b = grupo.times.find(t => t.nome === jogo.timeB);
      const ga = parseInt(jogo.golsA);
      const gb = parseInt(jogo.golsB);
      a.gp += ga; a.gc += gb;
      b.gp += gb; b.gc += ga;
      a.sg = a.gp - a.gc;
      b.sg = b.gp - b.gc;
      if (ga > gb) { a.pts += 3; a.v++; b.d++; }
      else if (ga < gb) { b.pts += 3; b.v++; a.d++; }
      else { a.pts++; b.pts++; a.e++; b.e++; }
    }
  });
  grupo.times.sort((a, b) =>
    b.pts - a.pts || b.sg - a.sg || b.gp - a.gp || a.nome.localeCompare(b.nome)
  );
}

// Função utilitária para gerar siglas dos times
function siglaTime(nome) {
  return nome.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 3);
}

// Nova função para renderizar a classificação em uma única tabela estilo GE
function tabelaGrupoHTML(grupo) {
  let html = `<table class="tabela__classificacao-moderna">
    <thead>
      <tr>
        <th class="posicao">C.</th>
        <th class="time-nome">Clube</th>
        <th class="sigla">S.</th>
        <th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th><th>%</th><th>ÚLT.</th>
      </tr>
    </thead>
    <tbody>
  `;
  grupo.times.forEach((t, idx) => {
    const classificado = idx < 2 ? 'classificado' : '';
    const jogos = grupo.rodadas.flat().filter(j => j.timeA === t.nome || j.timeB === t.nome).filter(j => j.golsA !== '' && j.golsB !== '').length;
    html += `<tr>
      <td class="posicao ${classificado}">${idx + 1}</td>
      <td class="time-nome">${t.nome}</td>
      <td class="sigla">${siglaTime(t.nome)}</td>
      <td>${t.pts}</td>
      <td>${jogos}</td>
      <td>${t.v}</td>
      <td>${t.e}</td>
      <td>${t.d}</td>
      <td>${t.gp}</td>
      <td>${t.gc}</td>
      <td>${t.sg}</td>
      <td>0</td>
      <td></td>
    </tr>`;
  });
  html += '</tbody></table>';
  return html;
}

// Atualiza placar do mata-mata
function onMataMataPlacarChange(e) {
  const input = e.target;
  const jogoIdx = parseInt(input.dataset.jogo);
  const time = input.dataset.time;
  
  // Permite apenas números de 0 a 99
  let val = input.value;
  if (val !== '') {
    val = Math.min(99, Math.max(0, parseInt(val) || 0));
    input.value = val;
  }
  
  mataMata.jogos[jogoIdx][time === 'A' ? 'golsA' : 'golsB'] = val;
  atualizarBotaoAvancarMataMata();
}

// Checa se todos os jogos do mata-mata estão preenchidos
function todosJogosMataMataPreenchidos() {
  return mataMata.jogos.every(j => j.golsA !== '' && j.golsB !== '');
}

// Atualiza botão avançar do mata-mata
function atualizarBotaoAvancarMataMata() {
  const btnAvancar = document.getElementById('btn-avancar');
  btnAvancar.disabled = !todosJogosMataMataPreenchidos();
}

// Atualiza o título da fase
function atualizarTituloFase() {
  const titulo = document.getElementById('fase-titulo');
  const fases = {
    'oitavas': 'OITAVAS DE FINAL',
    'quartas': 'QUARTAS DE FINAL',
    'semis': 'SEMIFINAIS',
    'terceiro': 'DISPUTA DO 3º LUGAR',
    'final': 'FINAL'
  };
  titulo.textContent = fases[mataMata.fase];
}

// Evento do botão voltar
document.getElementById('btn-voltar').addEventListener('click', () => {
  if (mataMata.fase === 'quartas') {
    mataMata.fase = 'oitavas';
    mataMata.jogos = gerarOitavas();
  } else if (mataMata.fase === 'semis') {
    mataMata.fase = 'quartas';
    mataMata.jogos = gerarQuartas();
  } else if (mataMata.fase === 'terceiro') {
    mataMata.fase = 'semis';
    mataMata.jogos = gerarSemifinais();
  } else if (mataMata.fase === 'final') {
    mataMata.fase = 'terceiro';
    mataMata.jogos = gerarTerceiroLugar();
  } else {
    document.getElementById('mundial-grupos').style.display = 'flex';
    document.getElementById('mundial-mata-mata').style.display = 'none';
    document.getElementById('btn-voltar').style.visibility = 'hidden';
    document.getElementById('fase-titulo').textContent = 'FASE DE GRUPOS';
    return;
  }
  
  renderMataMata();
  atualizarTituloFase();
}); 