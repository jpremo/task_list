from flask import Blueprint, jsonify, request
from app.models import List, db
from app.forms import ListCreateForm

list_routes = Blueprint('lists', __name__)


@list_routes.route('/', methods=['GET'])
def lists_get():
    """
    Retrieves and returns information on all lists
    """
    lists = List.query.all()
    legible_lists = [l.to_dict() for l in lists]
    return {'lists': legible_lists}


@list_routes.route('/', methods=['POST'])
def list_create():
    """
    Creates a new list
    """
    form = ListCreateForm(csrf_enabled=False)
    if form.validate_on_submit():
        data = request.get_json(force=True)
        newList = List(title=data['title'])
        db.session.add(newList)
        db.session.commit()
        return newList.to_dict()

    error_msgs = form.errors
    return {'errors': error_msgs}
