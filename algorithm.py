#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
from PIL import Image
import unicodedata

def predict_confidence(originalImagePath,tobeComparedImagePath,studentId):
    print type(originalImagePath),type(tobeComparedImagePath),type(studentId)
    originalImagePath = unicodedata.normalize('NFKD', originalImagePath).encode('ascii','ignore')
    tobeComparedImagePath = unicodedata.normalize('NFKD', tobeComparedImagePath).encode('ascii','ignore')
    studentId = unicodedata.normalize('NFKD', studentId).encode('ascii','ignore')
    print type(originalImagePath),type(tobeComparedImagePath),type(studentId)
    # For face detection we will use the Haar Cascade provided by OpenCV.
    cascadePath = "haarcascade_frontalface_default.xml"
    faceCascade = cv2.CascadeClassifier(cascadePath)

    # For face recognition we will the the LBPH Face Recognizer
    recognizer = cv2.createLBPHFaceRecognizer()

    # Path to the Yale Dataset
    path = originalImagePath
    
    # Call the get_images_and_labels function and get the face images and the
    # corresponding labels
    

    image_paths = [path]
    print path
    # images will contains face images
    images = []
    # labels will contains the label that is assigned to the image
    labels = []
    for image_path in image_paths:
        # Read the image and convert to grayscale
        image_pil = Image.open(image_path).convert('L')
        #image_pil = Image.open(image_path).convert('L')
        # Convert the image format into numpy array
        image = np.array(image_pil, 'uint8')
        # Get the label of the image
        nbr = int(os.path.split(image_path)[1].split(".")[0].replace("subject", ""))
        # Detect the face in the image
        faces = faceCascade.detectMultiScale(image)
        # If face is detected, append the face to images and the label to labels
        print faces
        for (x, y, w, h) in faces:
            images.append(image[y: y + h, x: x + w])
            labels.append(nbr)
            #cv2.imshow("Adding faces to traning set...", image[y: y + h, x: x + w])
            cv2.waitKey(10)



    #images, labels = get_images_and_labels(path)
    #print path
    cv2.destroyAllWindows()

    # Perform the tranining
    recognizer.train(images, np.array(labels))

    # Append the images with the extension .sad into image_paths
    image_paths = [tobeComparedImagePath]
    # print image_paths
    for image_path in image_paths:
        print image_path
        predict_image_pil = Image.open(image_path).convert('L')
        predict_image = np.array(predict_image_pil, 'uint8')
        faces = faceCascade.detectMultiScale(predict_image)
        confidences = [];
        print "faces : "
        print faces
        for (x, y, w, h) in faces:
            nbr_predicted, conf = recognizer.predict(predict_image[y: y + h, x: x + w])
    	# print "Nbr_predicted %d" %nbr_predicted
            # nbr_actual = int(os.path.split(image_path)[1].split(".")[0].replace("subject", ""))
    	# print "nbr_actual %d" %nbr_actual
            #if nbr_actual == nbr_predicted:
            print "is Correctly Recognized with confidence {}".format(conf)
            confidences.append(conf)
            #else:
            #    print "{} is Incorrect Recognized as {}".format(nbr_actual, nbr_predicted)
            #cv2.imshow("Recognizing Face", predict_image[y: y + h, x: x + w])
            cv2.waitKey(1000)
    return confidences

#def get_images_and_labels(path):
    # Append all the absolute image paths in a list image_paths
    # We will not read the image with the .sad extension in the training set
    # Rather, we will use them to test our accuracy of the training
    #image_paths = [path]
    #print path
    # images will contains face images
    #images = []
    # labels will contains the label that is assigned to the image
    #labels = []
    #for image_path in image_paths:
        # Read the image and convert to grayscale
     #   image_pil = Image.open(image_path).convert('L')
        #image_pil = Image.open(image_path).convert('L')
        # Convert the image format into numpy array
      #  image = np.array(image_pil, 'uint8')
        # Get the label of the image
       # nbr = int(os.path.split(image_path)[1].split(".")[0].replace("subject", ""))
        # Detect the face in the image
        #faces = faceCascade.detectMultiScale(image)
        # If face is detected, append the face to images and the label to labels
        #print faces
      #  for (x, y, w, h) in faces:
       #     images.append(image[y: y + h, x: x + w])
       #     labels.append(nbr)
       #     cv2.imshow("Adding faces to traning set...", image[y: y + h, x: x + w])
       #     cv2.waitKey(10)
    # return the images list and labels list
   # return images, labels

#predict_confidence("/home/sanket/Desktop/CMPE273PROJECT/Project/static/images/987654321/987654321-1", "/home/sanket/Desktop/CMPE273PROJECT/Project/static/images/987654321/987654321-2", "987654321")
