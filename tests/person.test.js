const Person = require("../src/person.js");
const Institution = require("../src/institution.js");

describe('Person Test', () => {
    let person;
    let institution;

    beforeEach(() => {
        institution = new Institution();
        person = new Person();
    });

    test('TC-01 :check if the get email function returns email', () => {
        //Arrange 
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testPerson = new Person('Aponte', 'Charlize', testInstitution, '2004-02-02', 'caponte', 'student');

        //ACT 
        const email = testPerson.email

        //assert
        expect(email).toBe('caponte@quinnipiac.edu');
    });

    test('TC-02: check if toString returns correct string ', () => {
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testPerson = new Person('Aponte', 'Charlize', testInstitution, '2004-02-2', 'caponte', 'student');

        //act 
        testPerson.toString()
        //assert
        const String = `\nStudent Name: Charlize Aponte\nSchool: Quinnipiac University\nDOB: Feb 2, 2004\nUsername: caponte\naffiliation: student\n`;

        expect(testPerson.toString()).toBe(String);
    });

})