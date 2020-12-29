const sequelize = require("../utils/database")
const Sequelize = require("sequelize")
const Post = sequelize.define("posts", {
    id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
    },
    author: {
        allowNull: false,
        type: Sequelize.STRING
    },
    text: {
        allowNull: false,
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
})
module.exports = Post