from flask.cli import AppGroup
from .lists import seed_lists, undo_lists
from .tasks import seed_tasks, undo_tasks
from .comments import seed_comments, undo_comments

seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_lists()
    seed_tasks()
    seed_comments()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_tasks()
    undo_lists()
