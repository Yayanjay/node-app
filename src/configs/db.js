const { Sequelize } = require('sequelize')

class Connect {
    constructor() {
        this.sequelize = new Sequelize(
            'postgres', //db name
            'postgres', //db user
            'seqP3SKYXczRextw', //db pass
            {
                dialect: 'postgres',
                host: 'db.qbklfulimtyotsqgpzhk.supabase.co',
                port: '5432'
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