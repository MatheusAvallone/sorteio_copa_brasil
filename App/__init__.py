from flask import Flask
from App.routes import bp

def create_app():
    app = Flask(__name__, 
                static_url_path='/static',
                static_folder='../static',
                template_folder='../templates')
    app.register_blueprint(bp)
    return app
