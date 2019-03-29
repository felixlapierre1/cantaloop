const mongoose = require('mongoose');

var courseSchem = require('../schemas/courseSchema');
var courseDescriptionSchema = require('../schemas/courseDescriptionSchema');
var courseCatalogSchema = require('../schemas/courseCatalogSchema');
const userSchema = require ('../schemas/userSchema')

mongoose.connect("mongodb+srv://skedge-user:8sDBuOw3zMD4ZpQp@skedge-cantaloop-kueik.mongodb.net/skedge-app")
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    })

function removeDuplicateCourses(myArray) {
    let result = [];
    let duplicate = false;
    for (let elements in myArray) {
        for (i = 0; i < result.length; i++) {
            if (myArray[elements].courseTitle == result[i].courseTitle) {
                duplicate = true;
            }
        }
        if (duplicate == false) {
            result.push(myArray[elements]);
        }
        duplicate = false;
    }
    return result;
}

module.exports = {
    getCourseCatalog: function () {
        let p1 = new Promise((resolve, reject) => {
            courseCatalogSchema.courseCatalog.find({}, function (err, result) {
                if (err) {
                    console.log("None")
                } else {
                    console.log(result);
                }
            });
        });
        return p1;
    },

    getCoursesDescription: function () {
        let p1 = new Promise((resolve, reject) => {
            courseDescriptionSchema.courseDescription.find({}, function (err, result) {
                if (err) {
                    console.log("None")
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
        return p1;
    },

    getCourses: function () {
        let p1 = new Promise((resolve, reject) => {
            courseSchem.courseSch.find({}, function (err, result) {
                if (err) {
                    console.log("None")
                } else {
                    console.log(result);
                }
            });
        });
    },

    getLabs: function () {
        courseSchem.labSch.find({}, function (err, result) {
            if (err) {
                console.log("None")
            } else {
                console.log(result);
            }
        });
    },

    getLectures: function () {
        courseSchem.lecSch.find({}, function (err, result) {
            if (err) {
                console.log("None")
            } else {
                console.log(result);
            }
        });
    },

    getTutorials: function () {
        courseSchem.tutSch.find({}, function (err, result) {
            if (err) {
                console.log("None")
            } else {
                console.log(result);
            }
        });
    },

    insertOneInDatabase: function (objectJSON, collectionName) {
      return new Promise ((resolve, reject) => {
        mongoose.connection.collection(collectionName).insertOne(objectJSON, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully added into database!");
            }
        })
      })
    },

    insertManyInDatabase: function (objectJSON, collectionName) {
      return new Promise ((resolve, reject) => {
        mongoose.connection.collection(collectionName).insertMany(objectJSON, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully added into database!");
            }
        })
      })
    },

    createUser: function (objectJS) {
      return new Promise((resolve, reject) => {
        mongoose.connection.collection("users").insertOne(objectJS, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve("Successfully added into database!");
            }
        })
      })
    },

    checkUserCredential: function (objectJSON) {
        userSchema.users.find(
          {
            username: objectJSON.username
          },
          function (err, result) {
            if (err) {
              console.log("User not found");
            } else {
              userSchema.users.find(
              {
                password: objectJSON.passsword
              },
              function (err, result) {
                if (err) {
                  console.log("Password does not match");
                } else {
                  console.log ("Login successful");
                }
              })
            }
          })
    }
};
