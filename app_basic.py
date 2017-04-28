#import MySQLdb as mdb
import pymongo
import sys
import os
import pprint
import unicodedata
from pymongo import MongoClient

from flask import Flask, render_template, request,redirect, url_for

# Connection with MongoDB database :
client = MongoClient('mongodb://akhilesh_123:cmpe273@ds123361.mlab.com:23361/cmpe273')
db = client['cmpe273']
collection = db['photorecog'];

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
print "app path : " + APP_ROOT

app = Flask(__name__,static_folder='templates')


@app.route("/",methods=["GET"])
def start():
	return render_template("upload.html")

@app.route("/login",methods=["POST"])
def index():
        Uid = request.get_json()
        print Uid
        cursor = collection.count({"_id" : Uid})
        print cursor
        if cursor == 0:
                print "NO record found"
                result = db.photorecog.insert_one({
                        "_id" : Uid,
                        "url" : ""
                })
                print result
                return redirect(url_for('index1',Uid = Uid))
        else:
                print "found"
                return render_template("home.html")

@app.route("/index1/<Uid>")
def index1(Uid):
	return render_template("upload.html",Uid=Uid)


@app.route("/uploadfile/<Uid>", methods=['POST'])
def upload(Uid):
        print "in Upload file"
        print request.files;
        target = os.path.join(APP_ROOT, 'images')
    	print(target)

     	if not os.path.isdir(target):
         	os.mkdir(target)

     	for file in request.files.getlist("file"):
		print(file)
		filename = file.filename
		print type(filename)
		destination = "/".join([target, filename])
		print "destination is : " + destination
		file.save(destination)
		destination = unicodedata.normalize('NFKD', destination).encode('ascii','ignore')
                result = db.photorecog.update_one({"_id" : Uid},{"$set" : {"url" : destination}});
                print result
    	return render_template("complete.html")

# The file location will stored across the Student Id, so while fetching the file from database, he needs to query wrt to StudentId
# and get the image and compare with the new image.
#
#

if __name__ == "__main__":
    # print "in main : creating connection"
    # curr = collection.find();
    # for document in curr:
    #     print(document);

    app.run(port=5000, debug=True)
