# FaceRecognition 

This project is about the comparision of two images and giving the result ( in percentage) of how much similar are the two images.


# Contributors 

- Tanmay  Bhatt - Worked on backend frontend integration , routing and hosted on AWS 
- Rahil Modi - Worked on UI development , Web cam integration and Frontend Integration .
- Sanket Dhami - Worked on Image comparison algorithm , storing information in database .
- Dhrumil Shah - Worked on UI Development, routing and testing of the app.
- Akhilesh Deowanshi - Worked on m-lab DB connection , image comaprison alogorithm & Dockerize the app 



# Features!

  - Create account and Upload Images . 
  - Click live images and compare with existing image .
  - Web App is hosted on AWS EC2 instance and can be accessed from anywhere .


### Tech

Face Recogniton App uses a number of open source projects to work properly:

* [Python] - Python is a widely used high-level programming language for general-purpose programming.
* [AngularJS] - HTML enhanced for web apps!
* [Opencv] - Open Source Computer Vision Library
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Flask] - evented I/O for the backend
* [Docker] - Docker is a container technology for Linux
* [AWS] - Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services
* [mLab's - Mongo DB] - mLab's MongoDB hosting platform is the fastest growing cloud Database-as-a-Service 


### Docker
Face Recogniton is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 80, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd Project
docker build -t akhilesh1312/facerecog
```
This will create the Face Recognition image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 5000 of the host to port 5000 of the Docker (or whatever port was exposed in the Dockerfile as we have exposed 5000):

```sh
docker run -d -p 5000:5000 --name FaceRecognition akhilesh1312/facerecog
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
localhost:5000
```

