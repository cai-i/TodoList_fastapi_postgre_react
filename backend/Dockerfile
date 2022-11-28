# /backend/Dockerfile

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
# # RUN python -m pip install --upgrade pip

# WORKDIR /app

# # Install python dependencies
# COPY ./requirements.txt $WORKDIR
# RUN python -m pip install -r requirements.txt

ADD requirements.txt .

RUN pip install -r requirements.txt

COPY ./app /app/api