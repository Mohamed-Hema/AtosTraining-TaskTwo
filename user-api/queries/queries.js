const getUsers = "SELECT * FROM usersexamengine";
const createUser = "INSERT INTO usersexamengine(username, password, userType) VALUES ($1, $2, $3)";


module.exports = {
    createUser,
    getUsers,
}