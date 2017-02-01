var students = [];
//students.push('first Student');
//var presentations = [];
//presentations.push('first presentations');

function init(name) {
  let element = {
    ID: 2,
    firstname: 'fName',
    lastname: 'lName',
    homeWork: [],
    results: 0
  };
  students.push(element);
  students.push(element.results = 2);
  name.forEach(x => students[x.StudentID - 1].results = x.score);
  //name.forEach(x => console.log(x));
}

init([
  { StudentID: 2, score: 4 },
  { StudentID: 1, score: 6 }]);
  //{ StudentID: 2 }]);
//init({help: 'ten'});