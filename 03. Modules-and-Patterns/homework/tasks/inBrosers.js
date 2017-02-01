var students = [];
students.push('first Student');
var presentations = [];
//presentations.push('first presentations');

function init(name) {
    studentWithHW = [];
    name.forEach(x => {
      //validateID(x.studentID, students.length);
      studentWithHW[x.StudentID] = (studentWithHW[x.StudentID] || 0) + 1;
      console.log(studentWithHW[x.StudentID]);
      if (studentWithHW[x.StudentID] > 1) {
        throw 'StudentID is given more than once';
      };
      if (
        x.score === undefined ||
        typeof (x.score) !== 'number') {
        throw 'score must be number';
      };
      console.log(x);
    });

}

init([
    {StudentID: 2, score: 4},
    {StudentID: 1, score: 4},
    {StudentID: 2}]);
//init({help: 'ten'});