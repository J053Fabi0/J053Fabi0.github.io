const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");

module.exports = ({ email, password }) =>
  new Promise((resolve, reject) => {
    UserModel.find({ email })
      .then((res) => {
        const [user] = res;
        if (!user) return reject(new Error("La contraseña es incorrecta o el usuario no existe."));

        bcrypt.compare(password, user.password, function (_, same) {
          same
            ? resolve({ same, user: user })
            : reject(new Error("La contraseña es incorrecta o el usuario es incorrecto"));
        });
      })
      .catch((err) => reject(err));
  });

// module.exports = async ({ email, password }) => {
//   const res = await UserModel.find({ email }).catch((err) => reject(err));

// };
