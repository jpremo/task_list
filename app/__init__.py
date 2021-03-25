import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate

from .models import db

from .seeds import seed_commands

from .config import Config

from .api.list_routes import list_routes

app = Flask(__name__)


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)

#setting route prefixes
app.register_blueprint(list_routes, url_prefix='/api/lists')

# Application Security
CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
