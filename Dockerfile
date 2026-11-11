FROM python:3.13-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY swagger-yaml-to-html.py ./

CMD [ "python", "./swagger-yaml-to-html.py" ]
