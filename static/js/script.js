// Verifica se o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado');
    
    const button = document.getElementById('btnSortear');
    const selectTorneio = document.getElementById('selectTorneio');
    const torneioTitulo = document.getElementById('torneio-titulo');
    
    if (!button || !selectTorneio || !torneioTitulo) {
        console.error('Elementos necessários não encontrados!');
        return;
    }
    
    console.log('Elementos encontrados');
    
    function mudarTorneio() {
        const torneioSelecionado = selectTorneio.value;
        torneioTitulo.textContent = torneioSelecionado === 'copa_brasil' ? 
            'Copa do Brasil 2025' : 'Libertadores 2025';
        document.getElementById('confrontos').innerHTML = '';
    }
    
    // Torna a função acessível globalmente
    window.mudarTorneio = mudarTorneio;
    
    button.addEventListener('click', async () => {
        const container = document.getElementById('confrontos');
        if (!container) {
            console.error('Container de confrontos não encontrado!');
            return;
        }
        
        // Desabilita o botão durante o sorteio
        button.disabled = true;
        button.textContent = 'Sorteando...';
        
        try {
            console.log('Iniciando sorteio...');
            const torneio = selectTorneio.value;
            const resposta = await fetch(`/sortear?torneio=${torneio}`);
            console.log('Resposta recebida:', resposta);
            
            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }
            
            const confrontos = await resposta.json();
            console.log('Confrontos recebidos:', confrontos);

            if (!Array.isArray(confrontos) || confrontos.length === 0) {
                throw new Error('Nenhum confronto recebido');
            }

            container.innerHTML = ''; // Limpa antes de exibir

            // Adiciona os cards com animação
            confrontos.forEach((jogo, index) => {
                console.log(`Criando card para jogo ${index + 1}:`, jogo);
                const card = document.createElement('div');
                card.className = 'confronto-card';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                card.innerHTML = `
                    <h3>Jogo ${index + 1}</h3>
                    <div class="time">${jogo.time1}</div>
                    <div class="vs">VS</div>
                    <div class="time">${jogo.time2}</div>
                `;
                
                container.appendChild(card);
                
                // Anima cada card individualmente
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });

            // Mostra o container com animação
            container.classList.add('visible');
            console.log('Sorteio concluído com sucesso!');
            
        } catch (error) {
            console.error('Erro detalhado:', error);
            alert('Erro ao realizar o sorteio. Por favor, verifique o console para mais detalhes.');
        } finally {
            // Reabilita o botão
            button.disabled = false;
            button.textContent = 'Sortear Confrontos';
        }
    });
}); 