const api = require("./api");
let users = [];

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
	users = [
		{ id: 1, firstName: "Jack", lastName: "Daniels", age: 33 },
		{ id: 2, firstName: "Jim", lastName: "Bean", age: 44 },
	];
	it("Contains the complete list of objects with all existing user data", () => {
		expect(api.viewAllUsers()).toEqual(expect.arrayContaining(users));
	});
	users = [];
});

describe("Created users are automatically assigned an auto incremental ID", () => {
	it("Begins by creating User Jack Daniels which is assigned an ID of 2", () => {
		expect(api.createUser("Jack", "Daniels", 21)).toEqual({
			id: 2,
			firstName: "Jack",
			lastName: "Daniels",
			age: 21,
		});
	}),
		it("Continues by creating User Jim Bean which is assigned an ID of 3", () => {
			expect(api.createUser("Jim", "Bean", 44)).toEqual({
				id: 3,
				firstName: "Jim",
				lastName: "Bean",
				age: 44,
			});
		});
	it("Continues by deleting user Jim Bean", () => {
		expect(api.deleteUser(3)).toEqual({
			id: 3,
			firstName: "Jim",
			lastName: "Bean",
			age: 44,
		});
	}),
		it("Continues by creating user Jim Beam II", () => {
			expect(api.createUser("Jim", "Bean II", 21)).toEqual({
				id: 4,
				firstName: "Jim",
				lastName: "Bean II",
				age: 21,
			});
		}),
		it("Finishes by returning the complete list of objects with User Jim Bean II having his ID automatically assigned with an auto-increment value", () => {
			expect(api.viewAllUsers()).toEqual(expect.arrayContaining(users));
		});
	users = [];
});
