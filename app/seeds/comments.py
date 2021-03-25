from app.models import db, Comment


def seed_comments():

    comment = Comment(taskId=1,
                body="Don't forget to buy milk too!")

    db.session.add(comment)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
