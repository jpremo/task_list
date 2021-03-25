from .db import db


class Task(db.Model):
  __tablename__ = 'tasks'

  id = db.Column(db.Integer, primary_key=True)
  listId = db.Column(
      db.Integer, db.ForeignKey("lists.id"), nullable=False)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(500), nullable=True)
  completed = db.Column(db.Boolean, nullable=False, default=False)
  comments = db.relationship(
      "Comment", back_populates="task", cascade="all, delete-orphan")
  currentList = db.relationship("List", back_populates="tasks")

  def to_dict(self):
    dict_comments = []
    for c in self.comments:
        dict_comments.append(c.to_dict())
    return {
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "completed": self.completed,
        "listId": self.currentList.id,
        "comments": dict_comments
    }
