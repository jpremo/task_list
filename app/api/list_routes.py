from flask import Blueprint, jsonify, request
from app.models import List, db

list_routes = Blueprint('lists', __name__)


@list_routes.route('/', methods=['GET'])
def lists_get():
    """
    Retrieves and returns information on all lists
    """
    lists = List.query.all()
    legible_lists = [l.to_dict() for l in lists]
    return {'lists': legible_lists}
