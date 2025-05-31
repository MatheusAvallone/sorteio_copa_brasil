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
    // Jogos da rodada
    const jogosDiv = document.createElement('div');
    jogosDiv.className = 'grupo-jogos';
    // Navegação de rodadas
    jogosDiv.innerHTML = `
      <div class="rodada-nav">
        <button class="seta-rodada" data-grupo="${idx}" data-dir="-1" ${grupo.rodadaAtual === 0 ? 'disabled' : ''}>&#8592;</button>
        <span class="rodada-titulo">${grupo.rodadaAtual + 1}ª RODADA</span>
        <button class="seta-rodada" data-grupo="${idx}" data-dir="1" ${grupo.rodadaAtual === 2 ? 'disabled' : ''}>&#8594;</button>
      </div>
      <div class="rodada-jogos">
        ${grupo.rodadas[grupo.rodadaAtual].map((jogo, jIdx) => `
          <div class="calendario-jogo">
            <span class="time-nome">${jogo.timeA}</span>
            <input type="number" min="0" value="${jogo.golsA}" data-grupo="${idx}" data-rodada="${grupo.rodadaAtual}" data-jogo="${jIdx}" data-time="A" />
            <span class="versus">x</span>
            <input type="number" min="0" value="${jogo.golsB}" data-grupo="${idx}" data-rodada="${grupo.rodadaAtual}" data-jogo="${jIdx}" data-time="B" />
            <span class="time-nome">${jogo.timeB}</span>
          </div>
        `).join('')}
      </div>
    `;
    bloco.appendChild(tabelaDiv);
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

// Checa se todos os jogos da fase de grupos estão preenchidos
function todosJogosPreenchidos() {
  return grupos.every(grupo => grupo.rodadas.flat().every(j => j.golsA !== '' && j.golsB !== ''));
}

// Lógica do botão avançar
function atualizarBotaoAvancar() {
  const btnAvancar = document.getElementById('btn-avancar');
  btnAvancar.disabled = !todosJogosPreenchidos();
}

document.addEventListener('DOMContentLoaded', () => {
  grupos.forEach(grupo => atualizarTabelaGrupoRodadas(grupo));
  renderGruposBlocos();
  atualizarBotaoAvancar();
  document.getElementById('btn-avancar').addEventListener('click', () => {
    // Aqui entrará a lógica do mata-mata
    alert('Avançar para o mata-mata! (em breve)');
  });
});

// Atualiza placar e tabela
function onPlacarChange(e) {
  const input = e.target;
  const gIdx = parseInt(input.dataset.grupo);
  const rodada = parseInt(input.dataset.rodada);
  const jIdx = parseInt(input.dataset.jogo);
  const time = input.dataset.time;
  const val = input.value === '' ? '' : Math.max(0, parseInt(input.value));
  grupos[gIdx].rodadas[rodada][jIdx][time === 'A' ? 'golsA' : 'golsB'] = val;
  atualizarTabelaGrupoRodadas(grupos[gIdx]);
  renderGruposBlocos();
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

// Gera HTML da tabela do grupo
function tabelaGrupoHTML(grupo) {
  let html = `<table class="tabela-grupo">
    <tr><th>Clube</th><th>Pts</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr>`;
  grupo.times.forEach((t, idx) => {
    const jogos = grupo.rodadas.flat().filter(j => j.timeA === t.nome || j.timeB === t.nome).filter(j => j.golsA !== '' && j.golsB !== '').length;
    html += `<tr class="${idx < 2 ? 'classificado' : ''}"><td>${t.nome}</td><td>${t.pts}</td><td>${jogos}</td><td>${t.v}</td><td>${t.e}</td><td>${t.d}</td><td>${t.gp}</td><td>${t.gc}</td><td>${t.sg}</td></tr>`;
  });
  html += '</table>';
  return html;
} 