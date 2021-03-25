from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import List


def list_exists(form, field):
    fieldId = field.data
    listCheck = List.query.get(fieldId)
    if not listCheck:
        raise ValidationError("Entered listId does not exist.")


class TaskCreateForm(FlaskForm):
    title = StringField('title', validators=[
                        DataRequired(message="title is required."),
                        Length(max=50, message="title may not exceed 50 characters.")])
    description = StringField('description', validators=[
        DataRequired(message="description is required."),
        Length(max=500, message="description may not exceed 500 characters.")])
    listId = IntegerField('listId', validators=[
        DataRequired(message="listId is required."), list_exists])
