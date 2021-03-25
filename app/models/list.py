from .db import db

class List(db.Model):
  __tablename__ = 'lists'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  tasks = db.relationship(
      "Task", back_populates="currentList", cascade="all, delete-orphan")

  def to_dict(self):
    dict_tasks = []
    for t in self.tasks:
        dict_tasks.append(t.to_dict())
    return {
        "id": self.id,
        "title": self.title,
        "tasks": dict_tasks
    }
