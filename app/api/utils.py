def retrieve_error_messages(errors):
    error_messages = []
    for field in errors:
        for error in errors[field]:
            error_messages.append(error)
    return error_messages
