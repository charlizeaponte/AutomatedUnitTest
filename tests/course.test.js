const Course = require("../src/course.js");

describe("Course Test", () => {
    let course;
    
    beforeEach(() => {
        course = new Course();
    });
    test('TC-08: verify a course was created successfully', () => {
         //arrange/act
        const course = new Course('Computer Science', '101', 'Introduction to CS', 3);

         //assert
        expect(course).toBeInstanceOf(Course);
        expect(course.department).toBe('Computer Science');
        expect(course.number).toBe('101');
        expect(course.name).toBe('Introduction to CS');
        expect(course.credits).toBe(3);
    });

    test('TC-09: verify a the toString method was displayed successfully', () => {
         //arrange/act
        const course = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const expectedString = 'Introduction to CS, Computer Science 101 (3 credits)';
         //assert
        expect(course.toString()).toBe(expectedString);
    });
});