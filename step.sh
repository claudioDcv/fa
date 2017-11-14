# Eliminar cache de GIT
# git rm -r --cached .
#
# ./manage.py createsuperuser
#
# claudio
# claudio.dcv@gmail.com
# 1234qwer

rm db.sqlite3
rm -r ./media
mkdir ./media

./manage.py makemigrations

./manage.py migrate

./manage.py loaddata ./initial/musicalstyle.json
./manage.py loaddata ./initial/musicalinstrument.json
./manage.py loaddata ./initial/eventstatus.json

# OPTIONAL DATA ONLY DEV
./manage.py loaddata ./initial/testdata.json
./manage.py loaddata ./initial/user.json

./manage.py runserver
