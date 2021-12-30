let users = [];
let id = 1;

const user = {
	id: 0,
	firstName: "",
	lastName: "",
	age: 0,
};

function createUser(firstName, lastName, age) {
	let newUser = Object.create(user);
	newUser.id = id;
	newUser.firstName = firstName;
	newUser.lastName = lastName;
	newUser.age = age;
	users.push(newUser);
	id++;
	return newUser;
}

function viewAllUsers() {
	return users.length > 1 ? users : null;
}

function findUserById(userId) {
	return query(["id"], [userId]);
}

function findUsersByFirstName(firstName) {
	return query(["firstName"], [firstName]);
}

function findUsersByFullName(fullName) {
	res = users.filter(
		(element) => element.firstName + " " + element.lastName == fullName
	);
	return res.length > 0 ? res : null;
}

function deleteAllUsers() {
	users = [];
	id = 1;
	return true;
}

function deleteUserById(userId) {
	let i = findFirstUserIndex(userId, "id");
	if (i != -1) {
		let deletedUser = users[i];
		users.splice(i, 1);
		return deletedUser;
	} else {
		return null;
	}
}

function query(keys, values) {
	let queryKeys = getParams(keys)[0];
	let queryValues = getParams(values)[0];
	let keyValues = getKeyValues(queryKeys, queryValues);
	let res = filteredUsers(keyValues);
	return res.length > 0 ? res : null;
}

function findFirstUserIndex(userId, property) {
	return users.map((element) => element[property]).indexOf(userId);
}

function getParams(...args) {
	return args;
}

function getKeyValues(keys, values) {
	let res = {};
	keys.forEach((key, i) => {
		res[key] = values[i];
	});
	return res;
}

function filteredUsers(keyValues) {
	let keys = Object.keys(keyValues);
	let values = Object.values(keyValues);
	let res = [];
	for (let i = 0; i <= keys.length - 1; i++) {
		res = users.filter((element) => {
			return element[keys[i]] == values[i];
		});
	}
	return res;
}

module.exports.createUser = createUser;
module.exports.findUserById = findUserById;
module.exports.findUsersByFullName = findUsersByFullName;
module.exports.findUsersByFirstName = findUsersByFirstName;
module.exports.viewAllUsers = viewAllUsers;
module.exports.deleteUserById = deleteUserById;
module.exports.deleteAllUsers = deleteAllUsers;
module.exports.query = query;
