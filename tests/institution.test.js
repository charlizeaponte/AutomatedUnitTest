const Institution = require("../src/institution.js");
const Course = require("../src/course.js");
const Student = require("../src/student.js");
const CourseOffering = require("../src/course-offering.js");
const Instructor = require("../src/instructor.js");

describe('Institution Test', () => {
    let institution;
    let course;
    let student;
    let courseOffering;
    let instructor

    beforeEach(() => {
        institution = new Institution();
        course = new Course();
        student = new Student();
        courseOffering = new CourseOffering();
        instructor = new Instructor();
    });

    test(' TC-10: CHECK IF DUPLICATED COURSE ADDED', () => {
         //arrange 
         const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
         const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        //act 
        testInstitution.add_course(testCourse);
        const result = testInstitution.add_course(testCourse);
         //assert
        expect(result).toBe('Course has already been added');
        expect(Object.keys(testInstitution.courseCatalog).length).toBe(1);
    });

    test('TC-12 :prevent double enrolling a student in an institution', () => {
         //arrange 
         const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
         const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        //act 
        testInstitution.enroll_student(testStudent);
        testInstitution.enroll_student(testStudent);  //adds the same student a second time 
        //assert
        expect(Object.keys(testInstitution.studentList).length).toBe(1);
    });
    test('TC- 13: duplicate course offering for the course error', () => {
        //Arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course("Computer Science", "101", "Intro to CS", 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "1");
        //act
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testCourseOffering); 
        const duplicateOffering = new CourseOffering(testCourse, "001", 2022, "1");
        testInstitution.add_course_offering(duplicateOffering); 
        //assert
        expect(testInstitution.courseSchedule[testCourse.name].length).toBe(2); 
    });
    test('TC-15: error hires a student as an instructor', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        //act/arrange
        expect(() => testInstitution.hire_instructor(testStudent)).toThrow(TypeError);
        expect(Object.keys(testInstitution.facultyList).length).toBe(0);
    });
    test('TC-05: check for duplicate courses being assigned to an instructor that is already teaching the course', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testCourseOffering = new CourseOffering(testCourse, "001", 2022, "1");
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        //act
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testCourseOffering);
        testInstitution.hire_instructor(testInstructor);
        testInstitution.assign_instructor(testInstructor, 'Introduction to CS', 'Computer Science', '101', '001', 2022, '1');
         testInstitution.assign_instructor(testInstructor, 'Introduction to CS', 'Computer Science', '101', '001', 2022, '1'); 
        //assert
        expect(testInstructor.course_list.length).toBe(1); 
    });
    test('assign_instructor - successfully assigns an instructor to a course offering', () => {
        // arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testCourseOffering = new CourseOffering(testCourse, '001', 2022, 'Spring');
        const testInstructor = new Instructor('Brown', 'Alice', testInstitution, '1980-03-15', 'abrown');
          //act
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testCourseOffering);
        testInstitution.hire_instructor(testInstructor);
        testInstitution.assign_instructor(
            testInstructor,
            'Introduction to CS',
            'Computer Science',
            '101',
            '001',
            2022,
            'Spring'
        );
    
        //assert
        expect(testCourseOffering.instructor).toBe(testInstructor);
        expect(testInstructor.course_list).toContain(testCourseOffering);
    });
    test('add_course - adds a new course to the courseCatalog', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);

        //act
        testInstitution.add_course(testCourse);

        //assert
        expect(testInstitution.courseCatalog["Introduction to CS"]).toBe(testCourse);
    });

    test('add_course_offering - adds a new offering to the courseSchedule', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testOffering = new CourseOffering(testCourse, "001", 2023, "Fall");
       

        //act
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testOffering);

        //assert
        expect(testInstitution.courseSchedule["Introduction to CS"]).toContain(testOffering);
    });

    test('add_course_offering - prevents adding duplicate course offerings', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testOffering1 = new CourseOffering(testCourse, "001", 2023, "Fall");
        const testOffering2 = new CourseOffering(testCourse, "001", 2023, "Fall");

        //act
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testOffering1);
        testInstitution.add_course_offering(testOffering2);

        //assert
        expect(Object.keys(testInstitution.courseSchedule["Introduction to CS"].length)).toStrictEqual([]);
    });
    test('constructor initializes name, domain, and lists', () => {
        //arrange/act 
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        //assert
        expect(testInstitution.name).toBe('Quinnipiac University');
        expect(testInstitution.domain).toBe('quinnipiac.edu');
        expect(testInstitution.studentList).toEqual({});
        expect(testInstitution.courseCatalog).toEqual({});
        expect(testInstitution.courseSchedule).toEqual({});
        expect(testInstitution.facultyList).toEqual({});
    });
    test('enroll_student-  adds a student to studentList', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
         const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
         //act
         testInstitution.enroll_student(testStudent);
        //arrange
        expect( testInstitution.studentList['caponte']).toBe(testStudent);
    });
    test('listStudents - logs the enrolled students', () => {
        // arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent1 = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        const testStudent2 = new Student("Appple", "Seed", testInstitution, "2004-02-02", "sapple");
        testInstitution.enroll_student(testStudent1);
        testInstitution.enroll_student(testStudent2);
        console.log = jest.fn(); //mocks console.log
        // act
        testInstitution.listStudents();
        // assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Enrolled Students (Quinnipiac University)'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('-------------------------------------------'));
        expect(console.log).toHaveBeenCalledWith('Aponte, Charlize');
        expect(console.log).toHaveBeenCalledWith('Appple, Seed');
    });
    test('enroll_student - only accepts student objects', () => {
        //arrange/act
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const nonStudent = { firstName: 'Charlize', lastName: 'Aponte' };
        //assert
        expect(() => testInstitution.enroll_student(nonStudent)).toThrow(TypeError);
    });
    test('enroll_student - logs a message when trying to enroll a student twice', () => {
        // arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testStudent = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
    
        //act
        console.log = jest.fn(); // mocks console.log 
        testInstitution.enroll_student(testStudent);  
        testInstitution.enroll_student(testStudent);  
        
        //assert
        expect(console.log).toHaveBeenCalledWith('Charlize Aponte is already enrolled!');
    });
    
    test('register_student_for_course - duplicate registration of student for same course offering', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testStudent = new Student('Aponte', 'Charlize', testInstitution, '2004-02-02', 'caponte');
        const testOffering = new CourseOffering(testCourse, '001', 2023, 'Fall');
      
        //act
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testOffering);
        testInstitution.enroll_student(testStudent);
        console.log = jest.fn(); //mocks console.log
        testInstitution.register_student_for_course(
            testStudent,
            'Introduction to CS',
            'Computer Science',
            '101',
            '001',
            2023,
            'Fall'
        );
        testInstitution.register_student_for_course(
            testStudent,
            'Introduction to CS',
            'Computer Science',
            '101',
            '001',
            2023,
            'Fall'
        );
      
        //assert
        expect(console.log).toHaveBeenCalledWith('\nCharlize Aponte is already enrolled in this course\n');
        expect(testOffering.registeredStudents.length).toBe(1); 
        expect(testOffering.registeredStudents.some(registeredStudent => registeredStudent.userName === testStudent.userName)).toBe(true); 
    });
    test('list_instructors - properly lists all instructors in the institution', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor1 = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        const testInstructor2 = new Instructor('Smith', 'Alice', testInstitution, '1980-03-15', 'asmith');
    
        //act
        testInstitution.hire_instructor(testInstructor1);
        testInstitution.hire_instructor(testInstructor2);
        console.log = jest.fn(); //mocks console.log
        testInstitution.list_instructors();
    
        //assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Instructor List (Quinnipiac University)'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('-------------------------------------------'));
        expect(console.log).toHaveBeenCalledWith('Jones, Jim');
        expect(console.log).toHaveBeenCalledWith('Smith, Alice');
    });
    
    test('hire_instructor - hire an instructor successfully when they are not already hired', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        
        //act
        testInstitution.hire_instructor(testInstructor);
        
        //assert
        expect(testInstitution.facultyList['jjones']).toBe(testInstructor);
        testInstitution.hire_instructor(testInstructor);
    });
    test('hire_instructor - prevent hiring an instructor who is already employed at the institution', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testInstructor = new Instructor('Jones', 'Jim', testInstitution, '1976-06-12', 'jjones');
        
        //act
        console.log = jest.fn(); //mocks console.log
        testInstitution.hire_instructor(testInstructor); 
        testInstitution.hire_instructor(testInstructor);  
        
        //assert
        expect(testInstitution.facultyList['jjones']).toBe(testInstructor); 
        expect(console.log).toHaveBeenCalledWith('Jim Jones already works at this institution!');
    });    
    test('list_course_catalog - check course catalog listing', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse1 = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testCourse2 = new Course('Mathematics', '102', 'Introduction to Math', 3);

        //act
        console.log = jest.fn(); //mocks console.log
        testInstitution.add_course(testCourse1);
        testInstitution.add_course(testCourse2);
        testInstitution.list_course_catalog();

        //assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Course Catalog (Quinnipiac University)'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('----------------------------------------'));
        expect(console.log).toHaveBeenCalledWith(testCourse1);
        expect(console.log).toHaveBeenCalledWith(testCourse2);
    });
    test('list_course_schedule -list courses for a specific year and quarter without department filter', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse1 = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testCourse2 = new Course('Mathematics', '101', 'Calculus I', 3);
        const testCourseOffering1 = new CourseOffering(testCourse1, '001', 2023, 'Fall');
        const testCourseOffering2 = new CourseOffering(testCourse2, '002', 2023, 'Fall');
        //act
        console.log = jest.fn(); //mocks console.log
        testInstitution.add_course(testCourse1);
        testInstitution.add_course(testCourse2);
        testInstitution.add_course_offering(testCourseOffering1);
        testInstitution.add_course_offering(testCourseOffering2);
        testInstitution.list_course_schedule(2023, 'Fall');

        //assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Course Schedule (Fall 2023)'));
        expect(console.log).toHaveBeenCalledWith('Introduction to CS, Computer Science 101-001 (Fall 2023)');
        expect(console.log).toHaveBeenCalledWith('Calculus I, Mathematics 101-002 (Fall 2023)');
    });
    test('list_course_schedule - list courses by year, quarter, and department', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse1 = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testCourse2 = new Course('Mathematics', '101', 'Calculus I', 3);
        const testCourseOffering1 = new CourseOffering(testCourse1, '001', 2023, 'Fall');
        const testCourseOffering2 = new CourseOffering(testCourse2, '002', 2023, 'Fall');
        //act

        console.log = jest.fn(); //mocks console.log
        testInstitution.add_course(testCourse1);
        testInstitution.add_course(testCourse2);
        testInstitution.add_course_offering(testCourseOffering1);
        testInstitution.add_course_offering(testCourseOffering2);
        testInstitution.list_course_schedule(2023, 'Fall', 'Computer Science');

        //assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Course Schedule (Computer Science, Fall 2023)'));
        expect(console.log).toHaveBeenCalledWith('Introduction to CS, Computer Science 101-001 (Fall 2023)');
        expect(console.log).not.toHaveBeenCalledWith('Calculus I'); //checks if the other department course isn't listed
    });
    test('list_course_schedule - no course offerings during the specified semester', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testCourseOffering = new CourseOffering(testCourse, '001', 2024, 'Spring');
        //act
        console.log = jest.fn(); //mocks console.log
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testCourseOffering);
        testInstitution.list_course_schedule(2023, 'Fall');

        //assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Course Schedule (Fall 2023)'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('----------------------------------------'));
        expect(console.log).toHaveBeenCalledWith('No offerings scheduled during this semester');
    });
    test('list_course_schedule - no course offerings scheduled at the institution', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        //act
        console.log = jest.fn(); //mocks console.log
        testInstitution.list_course_schedule(2023, 'Fall');

        //assert
        expect(console.log).toHaveBeenCalledWith('No offerings currently scheduled');
    });
    test('list_registered_students - check if list_registered_students displays correct students', () => {
        //arrange
        const testInstitution = new Institution('Quinnipiac University', 'quinnipiac.edu');
        const testCourse = new Course('Computer Science', '101', 'Introduction to CS', 3);
        const testStudent1 = new Student("Aponte", "Charlize", testInstitution, "2004-02-02", "caponte");
        const testStudent2 = new Student("Apple", "Seed", testInstitution, "2004-03-01", "sapple");
        const testCourseOffering = new CourseOffering(testCourse, "001", 2023, "Fall");
    
        //sct
        console.log = jest.fn(); //mocks console.log
        testInstitution.add_course(testCourse);
        testInstitution.add_course_offering(testCourseOffering);
        testInstitution.enroll_student(testStudent1);
        testInstitution.enroll_student(testStudent2);
        testInstitution.register_student_for_course(testStudent1, 'Introduction to CS', 'Computer Science', '101', '001', 2023, 'Fall');
        testInstitution.register_student_for_course(testStudent2, 'Introduction to CS', 'Computer Science', '101', '001', 2023, 'Fall');
        testInstitution.list_registered_students('Introduction to CS', 'Computer Science', '101', '001', 2023, 'Fall');
    
        //assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Registered Students List ('));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('------------------------------------------------------------'));
        expect(console.log).toHaveBeenCalledWith('Aponte, Charlize');
        expect(console.log).toHaveBeenCalledWith('Apple, Seed');
    });
});


