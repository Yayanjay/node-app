const db = require('../configs/db');
const sequelize = require('sequelize');

class Profile {
    constructor() {
        this.Profile = db.sequelize.define("profile", {
            id: {
                type: sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize.STRING(50),
                allowNull: false,
            },
            dateOfBirth: {
                type: sequelize.DATEONLY,
                allowNull: false,
            },
            age: {
                type: sequelize.INTEGER,
                allowNull: false,
            },
            whatsappNumber: {
                type: sequelize.STRING(20),
                allowNull: false,
            },
            homeTown: {
                type: sequelize.STRING(50),
                allowNull: false,
            },
            lastEducation: {
                type: sequelize.STRING(70),
                allowNull: false,
            },
            imageKey500: {
                type: sequelize.STRING(),
                allowNull: false,
            },
            imageKey1000: {
                type: sequelize.STRING(),
                allowNull: false,
            }
        })
    }

    commit() {
        return new Promise((resolve, reject) => {
            this.Profile.sync()
                .then((result) => {
                    resolve("Profile Table Successfully Created")
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    drop() {
        return new Promise((resolve, reject) => {
            this.Profile.drop()
                .then((result) => {
                    resolve("Profile Table Successfully Deleted")
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.Profile.findAll({
                order: [['id', 'ASC']],
                // attributes: { exclude: ['id'] }
            })
                .then((res) => {
                    if (res.length == 0) {
                        resolve({ note: "This Table is Empty" })
                    } else {
                        resolve(res)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    async getById(id) {
        try {
            const profile = await this.Profile.findByPk(id)

            return profile
        } catch (error) {
            console.log(error)
            return error
        }
    }


    async addProfile(data) {
        try {
            const profile = await this.Profile.create(
                data
            )
            const { id, ...results } = profile.toJSON()
            return results
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async updateProfile(profileId, data) {
        try {
            const res = await this.Profile.update(data, { where: { id: profileId } });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}

module.exports = new Profile()