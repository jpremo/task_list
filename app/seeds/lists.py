from app.models import db, List


def seed_lists():

    newList = List(title='To Do')

    db.session.add(newList)

    db.session.commit()


def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
