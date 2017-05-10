
FROM ibotdotout/python-opencv:latest
EXPOSE 5000
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
#ENTRYPOINT ["python"]
CMD ["python", "app_basic.py"]
