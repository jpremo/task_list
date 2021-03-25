from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class ListCreateForm(FlaskForm):
    title = StringField('title', validators=[
                        DataRequired(message="title is required."),
                        Length(max=50, message="title may not exceed 50 characters.")])
