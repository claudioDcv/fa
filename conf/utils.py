def merge_list(arr):
    return [x for x in set(arr)]


def roles_by_object(user, obj, without = ''):

    directors = []
    if without != 'directors':
        directors = [x for x in obj.directors.all()]
    guest_musician = [x for x in obj.guest_musician.all()]
    permanent_musician = [x for x in obj.permanent_musician.all()]

    roles = []

    if user in directors:
        roles.append('is_director')
    if user in guest_musician:
        roles.append('is_guest_musician')
    if user in permanent_musician:
        roles.append('is_permanent_musician')

    return roles

def has_edit(roles):
    if 'is_director' in roles:
        return True
    if 'is_guest_musician' in roles:
        return True
    if 'is_permanent_musician' in roles:
        return True
    return False
