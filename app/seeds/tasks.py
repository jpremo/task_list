from app.models import db, Task


def seed_tasks():

    task = Task(title='Buy groceries', listId=1,
                description='We should buy eggs, cereal, and potatoes!')

    db.session.add(task)

    db.session.commit()


def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
