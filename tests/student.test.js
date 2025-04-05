const Student = require("../src/student.js"); 
const Course = require("../src/course.js");
const CourseOffering = require("../src/course-offering.js");
const Institution = require("../src/institution.js");


describe('Student Test', () =>{
    let student;
    let institution;
    let course;
    let courseOffering;


    beforeEach(() =>{
        student = new Student();
        institution = new Institution();
        course = new Course();
        courseOffering = new CourseOffering();
    })

    test("TC-03: list_courses() returns empty list when no courses are assigned",() =>{
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        testInstitution.enroll_student(testStudent);
        
        //act
        const courses = testStudent.list_courses();
        //assert
        expect(courses).toEqual([]);
    });

    test('TC-04: student.get gpa() correctly calculates GPA from multiple courses', () => {
      //arrange
      const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
      const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
      const course1 = new Course("Science", "SCI101", "General Science", 4);
      const offering1 = new CourseOffering(course1, "001", 2024, "Fall");
      const course2 = new Course("Math", "MAT201", "Advanced Math", 3);
      const offering2 = new CourseOffering(course2, "002", 2025, "Spring");
      //act
      offering1.submit_grade(testStudent, 'B+');
      testStudent.courseList.push(offering1);
      offering2.submit_grade(testStudent, 'A-');
      testStudent.courseList.push(offering2);
      const expectedGPA = (3.33 * 4 + 3.67 * 3) / (4 + 3);
      //assert
      expect(testStudent.gpa).toBeCloseTo(expectedGPA);
  });
  
    test('list_courses() correctly lists one completed course in transcript', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        const testCourse = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "Fall");
        //act
        testInstitution.enroll_student(testStudent);
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testCourseOffering);
        testInstitution.register_student_for_course(
            testStudent,
            'Intro to CS',
            'Computer Science',
            'CSC101',
            '001',
            2022,
            'Fall' 
        );
        testCourseOffering.submit_grade(testStudent, 'A');
        const courses = testStudent.list_courses();

         //assert
         expect(courses).toEqual(['Intro to CS, Computer Science CSC101-001 (Fall 2022)']);
    });
    test('student.gpa returns 0 when no grades are submitted', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        const testCourse = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "Fall");
      
        //act
        testStudent.courseList.push(testCourseOffering);
      
        //asset
        expect(testStudent.gpa).toBe(0);
      });
      test('student.credits returns total credits from all enrolled courses', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        const testCourse = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "Fall");
        //act
        testStudent.courseList.push(testCourseOffering);
        //assert
        expect(testStudent.credits).toBe(3);
      });
      test('check if toString returns correct string ', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-2", "caponte");

        //act 
        testStudent.toString()
        const String = `\nStudent Name: Charlize Aponte\nSchool: Quinnipiac University\nDOB: Feb 2, 2004\nUsername: caponte\nEmail: caponte@quinnipiac.edu\nGPA: 0\nCredits: 0\n`;
        //assert
        expect(testStudent.toString()).toBe(String);
    });
    
    test('student.credits returns total credits from all enrolled courses', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        const testCourse1 = new Course("Computer Science", "CSC101", "Intro to CS", 3);
        const testCourseOffering1 = new CourseOffering(testCourse1, "001", 2022, "Fall");
        const testCourse2 = new Course("Mathematics", "MAT101", "Calculus I", 4);
        const testCourseOffering2 = new CourseOffering(testCourse2, "002", 2023, "Spring");

        //act
        testStudent.courseList.push(testCourseOffering1);
        testStudent.courseList.push(testCourseOffering2);
        //assert
        expect(testStudent.credits).toBe(7);

})
test("student constructor initializes properties correctly", () => {
    //arrange/act
    const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
    const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
    //assest
    expect(testStudent.lastName).toBe("Aponte");
    expect(testStudent.firstName).toBe("Charlize");
    expect(testStudent.school.name).toBe("Quinnipiac University");
    expect(testStudent.dateOfBirth).toEqual(new Date("2004-02-02"));
    expect(testStudent.userName).toBe("caponte");
    expect(testStudent.courseList).toEqual([]);
    expect(testStudent.transcript).toEqual({});
});

test("student inherits properties from Person", () => {
    //arrange/act
    const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
    const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
    //assert
    expect(testStudent.email).toBe("caponte@quinnipiac.edu"); 
});

test('get credits returns 0 when courseList is empty', () => {
    //arrange/act
    const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
    const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
    //assert
    expect(testStudent.credits).toBe(0);
});
test('student.get credits sums credits from multiple courses', () => {
    //arrange
    const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
    const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
    const course1 = new Course("Art", "ART101", "Basic Drawing", 2);
    const offering1 = new CourseOffering(course1, "003", 2023, "Fall");
    const course2 = new Course("Music", "MUS101", "Intro to Music", 3);
    const offering2 = new CourseOffering(course2, "004", 2024, "Spring");
    //act
    testStudent.courseList.push(offering1);
    testStudent.courseList.push(offering2);
    //assert
    expect(testStudent.credits).toBe(5);
});

test('list_courses() does not list course when no grade is present', () => {
    //arrange
    const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
    const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
    const course = new Course("Engineering", "ENG101", "Intro to Engineering", 3);
    const offering = new CourseOffering(course, "001", 2025, "Fall");
  //act
    testStudent.courseList.push(offering);
    const courses = testStudent.list_courses();
  //assert
    expect(courses).toEqual([]);
  });      
  test('gpa ignores course offering with unrecognized grade', () => {
    //arrange
    const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
    const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
    const course = new Course("Engineering", "ENG101", "Intro to Engineering", 3);
    const offering = new CourseOffering(course, "001", 2025, "Fall");
  //act
    offering.submit_grade(testStudent, 'Z'); 
    testStudent.courseList.push(offering);
  //assert
    expect(testStudent.gpa).toBe(0); 
  });

  test('list_courses() sorts by quarter when years are the same', () => {
    const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
    const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
  
    const course1 = new Course("CS", "CSC100", "Intro to CS", 3);
    const offering1 = new CourseOffering(course1, "001", 2023, "Spring");
    const course2 = new Course("CS", "CSC200", "Data Structures", 3);
    const offering2 = new CourseOffering(course2, "001", 2023, "Fall"); 
  
    // Add grades and offerings to simulate completed courses
    testStudent.transcript[offering1] = 'A';
    testStudent.transcript[offering2] = 'A';
  
    // Overriding toString to produce key for transcript
    offering1.toString = () => 'Intro to CS, CS CSC100-001 (2 2023)';
    offering2.toString = () => 'Data Structures, CS CSC200-001 (4 2023)';
  
    const ordered = testStudent.list_courses();
    expect(ordered).toEqual([
        'Intro to CS, CS CSC100-001 (Spring 2023)',
        'Data Structures, CS CSC200-001 (Fall 2023)',
      ]);
      
  });
    
})