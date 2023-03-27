const { Sequelize } = require('sequelize')

class Connect {
    constructor() {
        this.sequelize = new Sequelize(
            `${process.env.DATABASE_NAME}`, //db name
            `${process.env.DATABASE_USERNAME}`, //db user
            `${process.env.DATABASE_PASSWORD}`, //db pass
            {
                dialect: 'postgres',
                host: `${process.env.DATABASE_HOST}`,
                port: process.env.DATABASE_PORT
            }
        )
    }

    connection() {
        this.sequelize.authenticate()
            .then(() => {
                return console.log("Database Connected")
            })
            .catch(err => {
                console.log("Something Went Wrong, Cannot Connect to Database")
                console.log(err)
            })
    }
}

module.exports = new Connect()