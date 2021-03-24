const { get } = require("../db");

const getCollection = () => get().db("apimongo").collection("users");

module.exports = {
  create: (data) =>
    new Promise((resolve, reject) => {
      getCollection().insertOne(data, function (err, res) {
        if (err) return reject(err);
        resolve(res.ops[0]);
      });
    }),
  findAll: () =>
    new Promise((resolve, reject) => {
      getCollection()
        .find({})
        .toArray(function (err, res) {
          if (err) return reject(err);
          resolve(res);
        });
    }),
};
