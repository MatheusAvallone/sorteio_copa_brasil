from flask import Blueprint, jsonify, render_template, request
import random
import logging

# Configuração de logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

bp = Blueprint('routes', __name__)

TIMES_COPA_BRASIL = [
    "Atlético-MG", "Athletico-PR", "Bahia", "Botafogo",
    "Bragantino", "Corinthians", "Cruzeiro", "CRB",
    "CSA", "Flamengo", "Fluminense", "Internacional",
    "Palmeiras", "Retrô", "São Paulo", "Vasco"
]

TIMES_LIBERTADORES_POTE1 = [
    "Palmeiras", "São Paulo", "Racing", "River Plate",
    "Estudiantes", "Vélez Sarsfield", "Internacional", "LDU"
]

TIMES_LIBERTADORES_POTE2 = [
    "Botafogo", "Peñarol", "Flamengo", "Fortaleza",
    "Atlético Nacional", "Libertad", "Universitário", "Cerro Porteño"
]

@bp.route('/')
def index():
    logger.debug('Acessando página inicial')
    return render_template('index.html')

@bp.route('/sortear', methods=['GET'])
def sortear_confrontos():
    try:
        torneio = request.args.get('torneio', 'copa_brasil')
        logger.debug(f'Iniciando sorteio dos confrontos para o torneio: {torneio}')
        
        if torneio == 'copa_brasil':
            times = TIMES_COPA_BRASIL.copy()
            random.shuffle(times)
            confrontos = []
            for i in range(0, len(times), 2):
                confronto = {
                    'time1': times[i],
                    'time2': times[i+1]
                }
                confrontos.append(confronto)
        else:  # libertadores
            pote1 = TIMES_LIBERTADORES_POTE1.copy()
            pote2 = TIMES_LIBERTADORES_POTE2.copy()
            random.shuffle(pote1)
            random.shuffle(pote2)
            confrontos = []
            for i in range(len(pote1)):
                confronto = {
                    'time1': pote1[i],
                    'time2': pote2[i]
                }
                confrontos.append(confronto)

        logger.debug(f'Total de confrontos gerados: {len(confrontos)}')
        return jsonify(confrontos)
    except Exception as e:
        logger.error(f'Erro ao realizar sorteio: {str(e)}')
        return jsonify({'error': 'Erro ao realizar sorteio'}), 500

@bp.route('/mundial')
def mundial():
    return render_template('mundial.html')

