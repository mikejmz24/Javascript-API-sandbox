const users = [];
let id = 1;

const user = {
	id: 0,
	firstName: "",
	lastName: "",
	age: 0,
};

function viewUser(userId) {
	let i = findUserIndex(userId);
	if (i != -1) {
		return users[i];
	} else {
		return null;
	}
}

function viewAllUsers() {
	if (users.length < 1) {
		return null;
	} else {
		return users;
	}
}

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

function deleteUser(userId) {
	let i = findUserIndex(userId);
	if (i != -1) {
		let deletedUser = users[i];
		users.splice(i, 1);
		return deletedUser;
	} else {
		return null;
	}
}

function findUserIndex(userId) {
	return (i = users.map((e) => e.id).indexOf(userId));
}

module.exports.createUser = createUser;
module.exports.viewUser = viewUser;
module.exports.viewAllUsers = viewAllUsers;
module.exports.deleteUser = deleteUser;
