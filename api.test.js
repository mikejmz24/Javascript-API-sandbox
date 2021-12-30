const api = require("./api");

test("View All Users returns Null when no users exist", () => {
	expect(api.viewAllUsers()).toBeNull();
});

test("Create User creates user Jack Daniels and returns its User data", () => {
	expect(api.createUser("Jack", "Daniels", 33)).toEqual({
		id: 1,
		firstName: "Jack",
		lastName: "Daniels",
		age: 33,
	});
});

test("Find User by Id returns Null when id does not match any user", () => {
	expect(api.findUserById(0)).toBeNull();
});

test("Find User by Full Name finds and returns User Jack Daniels", () => {
	expect(api.findUsersByFullName("Jack Daniels")).toContainEqual(
		expect.objectContaining({
			firstName: "Jack",
			lastName: "Daniels",
			age: 33,
		})
	);
});

test("Find User by First Name finds and returns User Jack Daniels", () => {
	expect(api.findUsersByFirstName("Jack")).toContainEqual(
		expect.objectContaining({
			firstName: "Jack",
			lastName: "Daniels",
			age: 33,
		})
	);
});

test("Find User by First Name returns Null when First Name does not match any user", () => {
	expect(api.findUsersByFirstName("Elijah")).toBeNull();
});

test("Find First User by Full Name returns Null when Full Name does not match any user", () => {
	expect(api.findUsersByFullName("Johnny Walker")).toBeNull();
});

test("Find All Users returns Null when First Name does not match any user", () => {
	expect(api.findUsersByFirstName("Don Ramon")).toBeNull();
});

test("Find User by Id finds and returns user Jack Daniels", () => {
	expect(api.findUserById(1)).toContainEqual({
		id: 1,
		firstName: "Jack",
		lastName: "Daniels",
		age: 33,
	});
});

test("Delete User by Id returns Null when id does not match any user", () => {
	expect(api.deleteUserById(0)).toBeNull();
});

test("Delete User by Id deletes and returns User data of deleted user", () => {
	expect(api.deleteUserById(1)).toEqual({
		id: 1,
		firstName: "Jack",
		lastName: "Daniels",
		age: 33,
	});
});

describe("Find Users All Users by First Name returns a list of all users with the First Name Don Julio", () => {
	const donJulios = [
		{ id: 1, firstName: "Don Julio", lastName: "Blanco", age: 1 },
		{ id: 2, firstName: "Don Julio", lastName: "Reposado", age: 1 },
		{ id: 3, firstName: "Don Julio", lastName: "Añejo", age: 2 },
	];
	beforeAll(() => {
		return api.deleteAllUsers();
	});
	it("Begins by creating User Don Julio Blanco", () => {
		expect(api.createUser("Don Julio", "Blanco", 1)).toEqual({
			id: 1,
			firstName: "Don Julio",
			lastName: "Blanco",
			age: 1,
		});
	});
	it("Continues by creating User Don Julio Reposado", () => {
		expect(api.createUser("Don Julio", "Reposado", 1)).toEqual({
			id: 2,
			firstName: "Don Julio",
			lastName: "Reposado",
			age: 1,
		});
	});
	it("Continues by creating User Don Julio Añejo", () => {
		expect(api.createUser("Don Julio", "Añejo", 2)).toEqual({
			id: 3,
			firstName: "Don Julio",
			lastName: "Añejo",
			age: 2,
		});
	});
	it("Finishes by returning a list with all three Don Julios by searching them by their First Name", () => {
		expect(api.findUsersByFirstName("Don Julio")).toEqual(
			expect.arrayContaining(donJulios)
		);
	});
	afterAll(() => {
		return api.deleteAllUsers();
	});
});

describe("View all Users returns a list of objects with all user data", () => {
	const users = [
		{ id: 1, firstName: "Jack", lastName: "Daniels", age: 33 },
		{ id: 2, firstName: "Jim", lastName: "Bean", age: 44 },
	];
	beforeAll(() => {
		return api.deleteAllUsers();
	});
	it("Begins by creating User Jack Daniels age 33", () => {
		expect(api.createUser("Jack", "Daniels", 33)).toEqual({
			id: 1,
			firstName: "Jack",
			lastName: "Daniels",
			age: 33,
		});
	});
	it("Continues by creating User Jim Bean age 44", () => {
		expect(api.createUser("Jim", "Bean", 44)).toEqual({
			id: 2,
			firstName: "Jim",
			lastName: "Bean",
			age: 44,
		});
	});
	it("Finishes by returning the complete list of objects with all User data", () => {
		expect(api.viewAllUsers()).toEqual(users);
	});
	afterAll(() => {
		return api.deleteAllUsers();
	});
});

describe("Created users are automatically assigned an auto incremental ID", () => {
	const users1 = [
		{ id: 1, firstName: "Jack", lastName: "Daniels", age: 21 },
		{ id: 3, firstName: "Jim", lastName: "Bean II", age: 29 },
	];
	beforeAll(() => {
		return api.deleteAllUsers();
	});
	it("Begins by creating User Jack Daniels which is assigned an ID of 1", () => {
		expect(api.createUser("Jack", "Daniels", 21)).toEqual({
			id: 1,
			firstName: "Jack",
			lastName: "Daniels",
			age: 21,
		});
	});
	it("Continues by creating User Jim Bean which is assigned an ID of 2", () => {
		expect(api.createUser("Jim", "Bean", 44)).toEqual({
			id: 2,
			firstName: "Jim",
			lastName: "Bean",
			age: 44,
		});
	});
	it("Continues by deleting user Jim Bean which has an ID of 2", () => {
		expect(api.deleteUserById(2)).toEqual({
			id: 2,
			firstName: "Jim",
			lastName: "Bean",
			age: 44,
		});
	});
	it("Continues by creating user Jim Beam II which is assigned an ID of 3", () => {
		expect(api.createUser("Jim", "Bean II", 29)).toEqual({
			id: 3,
			firstName: "Jim",
			lastName: "Bean II",
			age: 29,
		});
	});
	it("Finishes by returning the complete list of Users each having been automatically assigned with an auto-incremental ID", () => {
		expect(api.viewAllUsers()).toEqual(users1);
	});
	afterAll(() => {
		return api.deleteAllUsers();
	});
});
