# Api Backend

## Requirements

    python >= 3.9

## Preparing the environment

Create your python environment (Linux)

```bash
python3 -m venv env
source env/bin/activate
```

## install dependencies

`pip install -r requirements.txt`

## Run migrations

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

## Run server

```bash
python manage.py runserver
```
