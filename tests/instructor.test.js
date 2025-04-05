const Institution = require("../src/institution.js");
const Instructor = require("../src/instructor.js");
const Person = require("../src/person.js");
const Course = require("../src/course.js")
const CourseOffering = require("../src/course-offering.js")

describe('Instructor Test', () => {
    let instructor;
    let institution;

    beforeEach(() => {
        institution = new Institution();
        instructor = new Instructor(); 
    });

    test('TC-06:returns an empty array if no courses are assigned', () => {
        //arrange 
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        testInstitution.hire_instructor(testInstructor);

        //act
        const courses =testInstructor.list_courses()
        

        //assert
        expect(courses).toEqual([]);
    });

    test('TC-07: verify a the toString method was displayed successfully', () => {
        //arrange 
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');

        //act
        testInstructor.toString()
        

        //assert
        const expectedString = `\nInstructor Name: Jim Jones\nSchool: Quinnipiac University\nDOB: Jun 11, 1976\nUsername: jjones\n`;
        expect(testInstructor.toString()).toEqual(expectedString);
    });

    test('list_courses() - filters by both year and quarter', () => {
        // arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        const testCourse1 = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering1 = new CourseOffering(testCourse1, "001", 2022, "Fall");
        const testCourse2 = new Course("Computer Science", "CSC325", "Database", 3);
        const testCourseOffering2 = new CourseOffering(testCourse2, "001", 2023, "Spring");
        const testCourse3 = new Course("Computer Science", "CSC230", "Algorithms", 3);
        const testCourseOffering3 = new CourseOffering(testCourse3, "001", 2022, "Fall");
        
        //act
        testInstitution.hire_instructor(testInstructor);
        testInstructor.courseList.push(testCourseOffering1);
        testInstructor.courseList.push(testCourseOffering2);
        testInstructor.courseList.push(testCourseOffering3); 
        const courses = testInstructor.list_courses(2022, 'Fall');
    
        //assert
        expect(courses).toEqual([
            "Intro to CS, Computer Science CSC101-001 (Fall 2022)",
            "Algorithms, Computer Science CSC230-001 (Fall 2022)"
        ]);
    });
    
    test('list_courses() - filters by year only', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        const testCourse = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "Fall");
        const testCourse2 = new Course("Computer Science", "CSC325", "Database", 3);
        const testCourseOffering2 = new CourseOffering(testCourse2, "001", 2023, "Spring");
        //act
        testInstitution.hire_instructor(testInstructor);
        testInstructor.courseList.push(testCourseOffering);
        testInstructor.courseList.push(testCourseOffering2);
        const courses = testInstructor.list_courses(2022);
        //assert
        expect(courses).toEqual([
           "Intro to CS, Computer Science CSC101-001 (Fall 2022)"
        ]);
    });
    test('list_courses() - filters by quarter only', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        const testCourse = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "Fall");
        const testCourse2 = new Course("Computer Science", "CSC325", "Database", 3);
        const testCourseOffering2 = new CourseOffering(testCourse2, "001", 2023, "Spring");
        //act
        testInstitution.hire_instructor(testInstructor);
        testInstructor.courseList.push(testCourseOffering);
        testInstructor.courseList.push(testCourseOffering2);
        const courses = testInstructor.list_courses(null, 'Fall');
        //assert
        expect(courses).toEqual([
            'Intro to CS, Computer Science CSC101-001 (Fall 2022)'
        ]);
    });
    test('list_courses() - returns all courses, sorted by year and quarter', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        const testCourse = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "Fall");
        const testCourse2 = new Course("Computer Science", "CSC325", "Database", 3);
        const testCourseOffering2 = new CourseOffering(testCourse2, "001", 2023, "Spring");
        //act
        testInstitution.hire_instructor(testInstructor);
        testInstructor.courseList.push(testCourseOffering);
        testInstructor.courseList.push(testCourseOffering2);
        const courses = testInstructor.list_courses();
        //assert
        expect(courses).toEqual([
          "Intro to CS, Computer Science CSC101-001 (Fall 2022)",
         "Database, Computer Science CSC325-001 (Spring 2023)",
        ]);
    });
    test('list_courses() - returns empty array for invalid year/quarter', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        const testCourse = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "Fall");
        //act
        testInstitution.hire_instructor(testInstructor);
        testInstructor.courseList.push(testCourseOffering);
        const courses = testInstructor.list_courses(2024, 'Fall'); // invalid year
        //assert
        expect(courses).toEqual([]);
    });
    

})