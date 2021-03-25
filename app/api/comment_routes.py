from flask import Blueprint, jsonify, request
from app.models import Comment, db
from app.forms import CommentCreateForm, CommentUpdateForm
from .utils import retrieve_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'])
def comments_create():
    """
    Creates a new comment
    """
    form = CommentCreateForm(csrf_enabled=False)
    if form.validate_on_submit():
        data = request.get_json(force=True)
        comment = Comment(body=data['body'], taskId=data['taskId'])
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

    error_msgs = retrieve_error_messages(form.errors)
    return {'errors': error_msgs}, 400


@comment_routes.route('/<int:id>', methods=['GET'])
def comments_get_one(id):
    """
    Retrieves and returns information on the specified comment
    """
    comment = Comment.query.get(id)
    if comment:
        return comment.to_dict()

    return {'errors': 'resource not found'}, 404


@comment_routes.route('/<int:id>', methods=['PUT'])
def comments_update(id):
    """
    Updates the specified comment
    """
    form = CommentUpdateForm(csrf_enabled=False)
    if form.validate_on_submit():
        data = request.get_json(force=True)
        comment = Comment.query.get(id)

        if comment:
            comment.body = data['body']
            db.session.commit()
            return comment.to_dict()

        return {'errors': 'resource not found'}, 404

    error_msgs = retrieve_error_messages(form.errors)
    return {'errors': error_msgs}, 400

@comment_routes.route('/<int:id>', methods=['DELETE'])
def comments_delete(id):
    """
    Deletes the specified comment
    """
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {'msg': 'resource successfully deleted', 'id': id}

    return {'errors': 'resource not found'}, 404
