from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Task


def task_exists(form, field):
    fieldId = field.data
    task = Task.query.get(fieldId)
    if not task:
        raise ValidationError("Entered taskId does not exist.")


class CommentCreateForm(FlaskForm):
    body = StringField('title', validators=[
        DataRequired(message="body is required."),
        Length(max=200, message="body may not exceed 200 characters.")])
    taskId = IntegerField('taskId', validators=[
        DataRequired(message="taskId is required."), task_exists])
