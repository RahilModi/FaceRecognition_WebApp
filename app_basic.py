#import MySQLdb as mdb
import pymongo
import sys
import os
import pprint
import unicodedata
from pymongo import MongoClient
from flask import jsonify
from flask import Flask, render_template, request,redirect, url_for ,session,escape

# Connection with MongoDB database :
client = MongoClient('mongodb://akhilesh_123:cmpe273@ds123361.mlab.com:23361/cmpe273')
db = client['cmpe273']
collection = db['photorecog']

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
print "app path : " + APP_ROOT

app = Flask(__name__,static_folder='templates')

#secret key
app.secret_key = 'dsjksdh88989djj'


@app.route("/",methods=["GET"])
def defaultpage():
    print "Arrived in index - ROOT"
    return render_template("Index.html")

@app.route("/home",methods=["GET"])
def homePage():
    print "Arrived in index - home"
    return render_template("Home.html")

@app.route("/compare",methods=["GET"])
def comparepage():
    print "Arrived in index - Comapre"
    if 'userId' in session:
        return render_template("compare.html")
    else:
        return render_template(url_for('loginpage'))

@app.route("/login",methods=["GET"])
def loginpage():
    print "Arrived in index - Login"
    return render_template("login.html")

@app.route("/signUp",methods=["GET"])
def signUpPage():
    print "Arrived in index - signUp"
    return render_template("signUp.html")

@app.route("/upload",methods=["GET"])
def uploadpage():
    print "Arrived in index - upload"
    # print session['userId']
    # if(session['userId'] != None):
    if 'userId' in session:
        return render_template("upload.html")
    else:
        return redirect(url_for('loginpage'))

@app.route("/logout",methods=["GET"])
def logout():
    print "Arrived in index - Logout"
    if 'userId' in session:
         # remove the userId from the session if it is there
        session.pop('userId', None)
        return redirect(url_for('defaultpage'))
    else:
        print 'error'

@app.route("/login",methods=["POST"])
def index():
    Uid = request.get_json()
    print Uid
    cursor = collection.count({"_id" : Uid})
    print cursor
    response = {'status' : '','msg' : ''}
    if cursor == 0:
        print "NO record found"
        result = db.photorecog.insert_one({
                "_id" : Uid,
                "url" : ""
        })
        print "not found...."
        print result
        response['status'] = "200"
        response['msg'] = "new"
        print response
    else:
        print "found user...."
        print "found"
        response['status'] = "200"
        response['msg'] = "existing"
        session['userId']=Uid;
        print Uid;
        print session['userId']
        print response
    return jsonify(response)

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
    file.save(destination)
    destination = unicodedata.normalize('NFKD', destination).encode('ascii','ignore')
    result = db.photorecog.update_one({"_id" : Uid},{"$set" : {"url" : destination}})
    print result
    return render_template("complete.html")

# The file location will stored across the Student Id, so while fetching the file from database, he needs to query wrt to StudentId
# and get the image and compare with the new image.
#
#

@app.route("/compare/<Uid>")
def compare(Uid):
    print "in Compare"
    print request.files
    target = os.path.join(APP_ROOT, 'images')
    print(target)

    if not os.path.isdir(target):
        os.mkdir(target)

    for file in request.files.getlist("file"):
        print(file)
        filename = file.filename
        print type(filename)
        tobeCompared = "/".join([target, filename])
        print "destination is : " + tobeCompared
        file.save(tobeCompared)
    result = db.photorecog.find({"_id" : Uid},{"_id" : "0", "url" : "1"})
    for d in result:
            originalImage = d['url']
    tobeCompared
    # Call python function passing URL of both files
    # originalImage & tobeCompared


if __name__ == "__main__":
    # print "in main : creating connection"
    # curr = collection.find();
    # for document in curr:
    #     print(document);

    app.run(port=5000, debug=True)
