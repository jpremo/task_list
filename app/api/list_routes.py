from flask import Blueprint, jsonify, request
from app.models import List, db
from app.forms import ListCreateForm
from .utils import retrieve_error_messages

list_routes = Blueprint('lists', __name__)


@list_routes.route('/', methods=['GET'])
def lists_get():
    """
    Retrieves and returns information on all lists
    """
    lists = List.query.order_by(List.id.asc()).all()
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

    error_msgs = retrieve_error_messages(form.errors)
    return {'errors': error_msgs}, 400


@list_routes.route('/<int:id>', methods=['GET'])
def lists_get_one(id):
    """
    Retrieves and returns information on the specified list
    """
    selected_list = List.query.get(id)
    if selected_list:
        return selected_list.to_dict()

    return {'errors': 'resource not found'}, 404


@list_routes.route('/<int:id>', methods=['PUT'])
def list_update(id):
    """
    Updates the specified list
    """
    form = ListCreateForm(csrf_enabled=False)
    if form.validate_on_submit():
        data = request.get_json(force=True)
        selected_list = List.query.get(id)
        if selected_list:
            selected_list.title = data['title']
            db.session.commit()
            return selected_list.to_dict()
        return {'errors': 'resource not found'}, 404

    error_msgs = retrieve_error_messages(form.errors)
    return {'errors': error_msgs}, 400

@list_routes.route('/<int:id>', methods=['DELETE'])
def lists_delete(id):
    """
    Deletes the specified list
    """
    selected_list = List.query.get(id)
    if selected_list:
        db.session.delete(selected_list)
        db.session.commit()
        return {'msg': 'resource successfully deleted', 'id': id}

    return {'errors': 'resource not found'}, 404
