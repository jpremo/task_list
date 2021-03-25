from flask import Blueprint, jsonify, request
from app.models import Task, db
from app.forms import TaskCreateForm, TaskUpdateForm
from .utils import retrieve_error_messages

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/', methods=['POST'])
def tasks_create():
    """
    Creates a new task
    """
    form = TaskCreateForm(csrf_enabled=False)
    if form.validate_on_submit():
        data = request.get_json(force=True)
        task = Task(
            listId=data['listId'], title=data['title'], description=data['description'])
        db.session.add(task)
        db.session.commit()
        return task.to_dict()

    error_msgs = retrieve_error_messages(form.errors)
    return {'errors': error_msgs}, 400


@task_routes.route('/<int:id>', methods=['GET'])
def tasks_get_one(id):
    """
    Retrieves and returns information on the specified task
    """
    task = Task.query.get(id)
    if task:
        return task.to_dict()

    return {'errors': 'resource not found'}, 404


@task_routes.route('/<int:id>', methods=['PUT'])
def tasks_update(id):
    """
    Updates specified task
    """
    form = TaskUpdateForm(csrf_enabled=False)
    if form.validate_on_submit():
        data = request.get_json(force=True)
        task = Task.query.get(id)
        if task:
            task.title = data['title']
            task.description = data['description']
            task.completed = data['completed']
            db.session.commit()
            return task.to_dict()

        return {'errors': 'resource not found'}, 404

    error_msgs = retrieve_error_messages(form.errors)
    return {'errors': error_msgs}, 400

@task_routes.route('/<int:id>', methods=['DELETE'])
def tasks_delete(id):
    """
    Deletes the specified task
    """
    task = Task.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return {'msg': 'resource successfully deleted', 'id': id}

    return {'errors': 'resource not found'}, 404
