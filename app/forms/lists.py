from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ListCreateForm(FlaskForm):
    title = StringField('title', validators=[
                        DataRequired(message="Title is required.")])
