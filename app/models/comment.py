from .db import db


class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  taskId = db.Column(
      db.Integer, db.ForeignKey("tasks.id"), nullable=False)
  body = db.Column(db.String(200), nullable=False)
  task = db.relationship("Task", back_populates="comments")

  def to_dict(self):
    return {
        "id": self.id,
        "body": self.body,
        "taskId": self.task.id
    }
