/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {

  // init the sysytem
  function init(title, presentationTitle) {
    // Create
    this.courseTitle = '';
    this.presentations = [];
    this.students = [];

    // validate title
    validateTitle(title);

    // set title
    courseTitle = title;

    // validate presantation
    if (
      presentationTitle === undefined ||
      !Array.isArray(presentationTitle) ||
      presentationTitle[0] === undefined
    ) {
      throw 'There are no presentations';
    };
    presentationTitle.forEach(x => validateTitle(x));

    // Create ID and set to array presantation
    presentationTitle.forEach((x, i) => this.presentations.push({ title: x, ID: (i + 1) }));
  }

  function validateTitle(value) {
    if (typeof (value) !== 'string') {
      throw value + ' must be a string';
    }
    //Titles have at least one character
    if (value.length < 2) {
      throw 'Titles have at least one character';
    }
    //Titles do not start or end with spaces
    if ((value.match(/^ | $/gm) || '').length > 0) {
      throw 'title start or end with space';
    }
    //Titles do not have consecutive spaces
    if ((value.match(/  /g) || '').length > 0) {
      throw 'Titles do not have consecutive spaces';
    }

    return value;
  }
  function validateStudentName(name) {
    // check if is a string
    if (
      name === undefined ||
      typeof (name) !== 'string'
    ) {
      throw name + ' must be a string'
    }

    // Names start with an upper case letter
    // All other symbols in the name (if any) are lowercase letters
    let match = name.match(/^[A-Z][a-z]*$/);
    if (match === null) {
      throw 'invalid Student name'
    }
  }
  function validateID(ID, lims) {
    // check if not a number
    if (Number.isNaN(ID)) {
      throw 'ID must be a number';
    }

    // check if not integer
    if (ID !== (ID | 0)) {
      throw 'invalid ID';
    }

    // check if out of range
    if (
      ID > lims ||
      ID < 1
    ) {
      throw 'Invalid ID';
    }
  }

  // Add student to list
  function addSt(name) {
    let fName, lName, mName;
    [fName, lName, mName] = name.split(' ');

    if (mName !== undefined) {
      throw 'student have more than 2 names';
    }
    validateStudentName(fName);
    validateStudentName(lName);
    let id = this.students.length + 1;
    let element = {
      ID: id,
      firstname: fName,
      lastname: lName,
      homeWork: [],
      results: 0
    };
    this.students.push(element);
    return id;
  }

  //get list of all students
  function getAllStudents() {
    let allStudents = [];
    this.students.forEach(
      x => allStudents.push({ firstname: x.firstname, lastname: x.lastname, id: x.ID })
    );
    return allStudents;
  }

  // Submit Homework 
  function submitHomework(stID, hwID) {
    validateID(stID, this.students.length);
    validateID(hwID, this.presentations.length);
    this.students[stID - 1].homeWork.push(hwID);
  }

  // push exam results
  function pushExamResults(results) {
    let studentWithHW = [];
    if (
      results === undefined ||
      !Array.isArray(results)
    ) {
      throw 'result must be not empty array!';
    }

    results.forEach(x => {
      validateID(x.StudentID, this.students.length);
      studentWithHW[x.StudentID] = (studentWithHW[x.StudentID] || 0) + 1;
      if (studentWithHW[x.StudentID] > 1) {
        throw 'StudentID is given more than once';
      };
      if (
        x.score === undefined ||
        Number.isNaN(x.score)) {
        throw 'score must be number';
      }
    });
    results.forEach(x => this.students[x.StudentID].results = x.score);
    //return this;
  }

  var Course = {
    init: function (title, presentations) {
      init(title, presentations);
    },
    addStudent: function (name) {
      return addSt(name);
    },
    getAllStudents: function () {
      return getAllStudents();
    },
    submitHomework: function (studentID, homeworkID) {
      submitHomework(studentID, homeworkID);
    },
    pushExamResults: function (results) {
      pushExamResults(results);
    },

    getTopStudents: function () {
    }
  };
  return Course;
}

module.exports = solve;
