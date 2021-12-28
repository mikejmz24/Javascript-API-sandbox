const api = require("./api");

test("View All Users returns Null when no users exist", () => {
	expect(api.viewAllUsers()).toBeNull();
});

test("Create User creates user Jack Daniels successfully", () => {
	expect(api.createUser("Jack", "Daniels", 33)).toEqual({
		id: 1,
		firstName: "Jack",
		lastName: "Daniels",
		age: 33,
	});
});

test("View User returns Null when id does not match any user", () => {
	expect(api.viewUser(0)).toBeNull();
});

test("View User finds and returns user Jack Daniels successfully", () => {
	expect(api.viewUser(1)).toEqual({
		id: 1,
		firstName: "Jack",
		lastName: "Daniels",
		age: 33,
	});
});

test("Delete User returns Null when id does not match any user", () => {
	expect(api.deleteUser(0)).toBeNull();
});

test("Delete User returns User data of deleted user", () => {
	expect(api.deleteUser(1)).toEqual({
		id: 1,
		firstName: "Jack",
		lastName: "Daniels",
		age: 33,
	});
});

describe("View all Users returns a list of objects with all user data", () => {
	const users = [
		{ id: 2, firstName: "Jack", lastName: "Daniels", age: 33 },
		{ id: 3, firstName: "Jim", lastName: "Bean", age: 44 },
	];
	it("Begins by creating User Jack Daniels age 33", () => {
		expect(api.createUser("Jack", "Daniels", 33)).toEqual({
			id: 2,
			firstName: "Jack",
			lastName: "Daniels",
			age: 33,
		});
	});
	it("Continues by creating User Jim Bean age 44", () => {
		expect(api.createUser("Jim", "Bean", 44)).toEqual({
			id: 3,
			firstName: "Jim",
			lastName: "Bean",
			age: 44,
		});
	});
	it("Contains the complete list of objects with all existing user data", () => {
		expect(api.viewAllUsers()).toEqual(users);
	});
	afterAll(() => {
		return api.deleteAllUsers();
	});
});

describe("Created users are automatically assigned an auto incremental ID", () => {
	const users1 = [
		{ id: 4, firstName: "Jack", lastName: "Daniels", age: 21 },
		{ id: 6, firstName: "Jim", lastName: "Bean II", age: 29 },
	];
	it("Begins by creating User Jack Daniels which is assigned an ID of 2", () => {
		expect(api.createUser("Jack", "Daniels", 21)).toEqual({
			id: 4,
			firstName: "Jack",
			lastName: "Daniels",
			age: 21,
		});
	});
	it("Continues by creating User Jim Bean which is assigned an ID of 3", () => {
		expect(api.createUser("Jim", "Bean", 44)).toEqual({
			id: 5,
			firstName: "Jim",
			lastName: "Bean",
			age: 44,
		});
	});
	it("Continues by deleting user Jim Bean", () => {
		expect(api.deleteUser(5)).toEqual({
			id: 5,
			firstName: "Jim",
			lastName: "Bean",
			age: 44,
		});
	});
	it("Continues by creating user Jim Beam II", () => {
		expect(api.createUser("Jim", "Bean II", 29)).toEqual({
			id: 6,
			firstName: "Jim",
			lastName: "Bean II",
			age: 29,
		});
	});
	it("Finishes by returning the complete list of objects with User Jim Bean II having his ID automatically assigned with an auto-increment value", () => {
		expect(api.viewAllUsers()).toEqual(users1);
	});
	afterAll(() => {
		return api.deleteAllUsers();
	})
});
