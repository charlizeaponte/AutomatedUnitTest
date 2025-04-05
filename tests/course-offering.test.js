const CourseOffering = require('../src/course-offering.js');
const Course = require('../src/course.js');
const Student = require('../src/student.js');
const Instructor = require('../src/instructor.js');
const Institution = require('../src/institution.js');

describe('CourseOffering Test', () => {
    let course;
    let courseOffering;
    let student1;
    let student2;
    let instructor;
    let invalidInstructor;
    let institution;

    beforeEach(() => {
        institution = new Institution();
        course = new Course();
        courseOffering = new CourseOffering();
        student1 = new Student();
        student2 = new Student();
        instructor = new Instructor();
        invalidInstructor = new Student(); 
        
    });

    test('TC-14: successfully submits a grade', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Mathematics', '101', 'Calculus I', 4);
        const testCourseOffering = new CourseOffering(testCourse, '01', 2022, 'Fall');
        const testStudent = new Student('Robert', 'John', testInstitution, '2003-08-10', 'jrobert');
        const testInstructor = new Instructor('David', 'Quinn', testInstitution, '1970-05-20', 'dquinn');
        testInstitution.hire_instructor(testInstructor);
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testCourseOffering);
        testInstitution.assign_instructor(testInstructor, 'Calculus I', 'Mathematics', '101', '01', 2022, 'Fall');

        //act
        testCourseOffering.submit_grade(testStudent, 'B+', testInstructor);

        //assert
        expect(testCourseOffering.grades[testStudent.username]).toBe('B+');
    });

    test('TC-11: verify if students were registered for a course', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Mathematics', '101', 'Calculus I', 4);
        const testCourseOffering = new CourseOffering(testCourse, '01', 2022, 'Fall');
        const testStudent1 = new Student('Garcia', 'Carlos', testInstitution, '2001-12-05', 'cgarcia');
        const testStudent2 = new Student('Lopez', 'Maria', testInstitution, '2003-04-18', 'mlopez');
        const initialRegisteredStudentsCount = testCourseOffering.registeredStudents.length;
        const initialStudent1CourseListCount = testStudent1.courseList.length;
        const initialStudent2CourseListCount = testStudent2.courseList.length;
        const studentsToRegister = [testStudent1, testStudent2];

        //act
        testCourseOffering.register_students(studentsToRegister);

        //assert
        expect(testCourseOffering.registeredStudents.length).toBe(initialRegisteredStudentsCount + studentsToRegister.length);
        expect(testCourseOffering.registeredStudents).toContain(testStudent1);
        expect(testCourseOffering.registeredStudents).toContain(testStudent2);
        expect(testStudent1.courseList.length).toBe(initialStudent1CourseListCount + 1);
        expect(testStudent1.courseList).toContain(testCourseOffering);
        expect(testStudent2.courseList.length).toBe(initialStudent2CourseListCount + 1);
        expect(testStudent2.courseList).toContain(testCourseOffering);
    });
    test('get_grade() - Returns the correct grade for a registered student object', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Mathematics', '101', 'Calculus I', 4);
        const testCourseOffering = new CourseOffering(testCourse, '01', 2022, 'Fall');
        const testStudent = new Student('Alice', 'Smith', testInstitution, '2002-01-15', 'asmith');
        
        //act
        testCourseOffering.register_students([testStudent]);
        testCourseOffering.submit_grade(testStudent, 'A');
        const retrievedGrade = testCourseOffering.get_grade(testStudent);

        //assert
        expect(retrievedGrade).toBe('A');
    });

    test('get_grade() - Returns undefined for a student with no submitted grade', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Mathematics', '101', 'Calculus I', 4);
        const testCourseOffering = new CourseOffering(testCourse, '01', 2022, 'Fall');
        const testStudent = new Student('Charlie', 'Brown', testInstitution, '2004-03-01', 'cbrown');
    
        //act
        testCourseOffering.register_students([testStudent]);
        const retrievedGrade = testCourseOffering.get_grade(testStudent);

        //assert
        expect(retrievedGrade).toBeUndefined();
    });

    test('get_grade() - Returns undefined for an unregistered student', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Mathematics', '101', 'Calculus I', 4);
        const testCourseOffering = new CourseOffering(testCourse, '01', 2022, 'Fall');
        const testStudent = new Student('Diana', 'Davis', testInstitution, '2003-09-12', 'ddavis');

        //act
        const retrievedGrade = testCourseOffering.get_grade(testStudent);

        //assert
        expect(retrievedGrade).toBeUndefined();
    });

    test('get_grade() - Returns undefined for an unknown username string', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Mathematics', '101', 'Calculus I', 4);
        const testCourseOffering = new CourseOffering(testCourse, '01', 2022, 'Fall');
        const testStudent = new Student('Eve', 'Miller', testInstitution, '2002-11-05', 'emiller');

        //act
        testCourseOffering.register_students([testStudent]);
        testCourseOffering.submit_grade(testStudent, 'C+');
        const retrievedGrade = testCourseOffering.get_grade('unknownUser');

        //assert
        expect(retrievedGrade).toBeUndefined();
    });
});