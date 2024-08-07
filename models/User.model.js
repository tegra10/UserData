"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
const sequelize = require("../config/config.js");
const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("prenom", value.trim());
            }
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("nom", value.trim());
            }
        },
        postnom: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("postnom", value.trim());
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue("email", value.trim());
            }
        },
        lieu_de_naissance: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("lieu_de_naissance", value.trim());
            }
        },
        date_de_naissance: {
            type: DataTypes.DATE,
            allowNull: false
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("profession", value.trim());
            }
        },
        telephone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue("password", value.trim());
            }
        }
    },
    {
        timestamps: true
    }
);

// Hook pour saler et hasher le mot de passe avant de sauvegarder un nouvel utilisateur
User.beforeCreate(async (user, options) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
});

// Méthode pour vérifier le mot de passe
User.prototype.verifyPassword = async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
};

module.exports = User;
