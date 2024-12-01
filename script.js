class Student {
    constructor(id, name, surname, grade1, grade2, lectures, letterGrade) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.lectures = lectures;
        this.letterGrade = letterGrade;
        this.gpa = 0.0;
    }
    getStudentInfoHTML() {
        return `
            <td>${this.id}</td>
            <td>${this.name}</td>
            <td>${this.surname}</td>
            <td>${this.grade1}</td>
            <td>${this.grade2}</td>
            <td>${this.lectures}</td>
            <td>${this.letterGrade}</td>
            <td>
            <button class = "update-button" onclick="updateStudent('${this.id}','${this.lectures}')">Update</button>
            <button class = "delete-button" onclick="deleteStudent('${this.id}')">Delete</button>
        </td>
        `;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            grade1: this.grade1,
            grade2: this.grade2,
            lectures: this.lectures,
            letterGrade: this.letterGrade
        };
    }

    static fromJSON(json) {
        return new Student(json.id, json.name, json.surname, json.grade1, json.grade2, json.lectures, json.letterGrade);
    }
}
class Lecture {
    constructor(code, name, credit) {
        this.code = code;
        this.name = name;
        this.credit = credit;
    }

    getLectureInfoHTML() {
        return `
        <td>${this.code}</td>
        <td>${this.name}</td>
        <td>${this.credit}</td>
        <td>
            <button class = "update-button" onclick="updateLecture('${this.code}')">Update</button>
            <button class = "delete-button" onclick="deleteLecture('${this.code}')">Delete</button>
        </td>
    `;
    }

    toJSON() {
        return {
            code: this.code,
            name: this.name,
            credit: this.credit
        };
    }
    static fromJSON(json) {
        return new Lecture(json.code, json.name, json.credit);
    }
}

let students = []; 
let lectures = []; 

document.addEventListener('DOMContentLoaded', function () {
    if (lectures.length === 0 && students.length === 0) {
        addLectureAuto();
        addStudentAuto();
    }
    changeContent('Homepage');
});

function changeContent(content) {
    var contentArea = document.getElementById('contentArea');
     if (content === 'Homepage') {
        contentArea.innerHTML = `
        <div class="welcome-container">
        <h1 class="welcome-heading">Announcements</h1>
        <p class="welcome-text">
            Dear Students,
            The course registrations for the spring semester will begin on 
            January 1, 2024. You can complete your registrations through the 
            student information system starting from this date.
            Important Dates:<br>
            <strong>Registration Start Date: January 1, 2025</strong> <br>
            <strong>Registration End Date: January 15, 2025</strong> <br>
            <strong>Course Start Date: January 22, 2024</strong> <br>
            Please do not postpone your registration to the last day to avoid 
            any inconvenience. For further details, feel free to contact your academic advisors.<br>
            Wishing you a successful semester!

            School Administration
        </p>
        </div>

        <div class="welcome-container">
        <p class="welcome-text">
            Dear Students, <br>
            Our university's annual <strong>Career Days</strong> will take place this year from February <strong>20 to February 23, 2025</strong>. 
            During the event, you will have the opportunity to meet professionals from various sectors and explore 
            exciting career opportunities. <br>
            Venue: University Congress Center <br>
            Don't miss this unique opportunity to boost your career! <br>
            University Administration 
        </p>
        </div>
       
`;

        var studentInfoFeature = document.querySelector('.feature:nth-child(1)');
        var lecturesFeature = document.querySelector('.feature:nth-child(2)');
        var detaisFeature = document.querySelector('.feature:nth-child(3)');
        studentInfoFeature.addEventListener('click', function () {
            changeContent('Students'); 
        });

        lecturesFeature.addEventListener('click', function () {
            changeContent('Lectures'); 
        });

        detailsFeature.addEventListener('click', function () {
            changeContent('Details');
        });

        addStudentFormContainer.style.display = 'none';
        addLectureFormContainer.style.display = 'none';
        failedStudentHome.style.display = "none";
        succededStudentHome.style.display = "none";
        studentGpaContainer.style.display = "none";
        studentTableContainer.style.display = 'none';
        resetDetails();
    } else if (content === 'Students') {
        populateLectureDropdown();

        contentArea.innerHTML = ``;
        addStudentFormContainer.style.display = 'block';
        addLectureFormContainer.style.display = 'none';
        failedStudentHome.style.display = "none";
        succededStudentHome.style.display = "none";
        studentGpaContainer.style.display = "none";
        studentTableContainer.style.display = 'block';

        updateStudentList()
        resetDetails();
    }

    else if (content === 'Lectures') {
        contentArea.innerHTML =
            `
        <div id="lectureTableContainer" style="display: block;">
            <h1 style="color: #2b2626; font-size: 3em;">Lectures</h1>
            <table class="lectureTable" border="1">
            <thead>
                <tr>
                    <th>Lecture Code</th>
                    <th>Lecture Name</th>
                    <th>Lecture Credit</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="lectureList">
            </tbody>
            </table>
        </div>
    `;

        if (lectures.length === 0) {
            lectureTableContainer.style.display = 'none';
        }
        addStudentFormContainer.style.display = 'none';
        addLectureFormContainer.style.display = 'block';
        failedStudentHome.style.display = "none";
        succededStudentHome.style.display = "none";
        studentGpaContainer.style.display = "none";
        studentTableContainer.style.display = 'none';
        updateLectureList()
        resetDetails();
    }
    else if (content === 'Details') {
        populateLectureDropdownHome();
        populateLectureDropdownHomeSucceded();
        populateLectureDropdownHomeStudents();

        document.getElementById('courseSelectHome').addEventListener('change', function () {
            getFailedStudentsByCourse();
        });
        document.getElementById('courseSelectHome2').addEventListener('change', function () {
            getSuccededStudentsByCourse();
        });
        document.getElementById('selectStudentHome').addEventListener('change', function () {
            getStudentsListForHome();
        });

        contentArea.innerHTML = `
         `;
        addStudentFormContainer.style.display = 'none';
        addLectureFormContainer.style.display = 'none';
        failedStudentHome.style.display = "block";
        succededStudentHome.style.display = "block";
        studentGpaContainer.style.display = "block";
        studentTableContainer.style.display = 'none';
    }
}

function findStudentById(studentId) {
    return students.find(function (student) {
        return student.id === studentId;
    });
}

var newStudentID = document.getElementById('studentID');
newStudentID.addEventListener('input', function () {
    console.log(newStudentID.value);

    var enteredId = newStudentID.value;

    if (enteredId.length > 8) {
        console.log(enteredId.length);
        var student = students.find(student => student.id === enteredId);
        if (student) {
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentSurname').value = student.surname;
        }
    }
    else {
        document.getElementById('studentName').value = '';
        document.getElementById('studentSurname').value = '';
    }
});

document.getElementById('addStudentButton').addEventListener('click', function () {
    var studentIdInput = document.getElementById('studentID');
    var studentNameInput = document.getElementById('studentName');
    var studentSurnameInput = document.getElementById('studentSurname');
    var studentGrade1Input = document.getElementById("grade1");
    var studentGrade2Input = document.getElementById("grade2");
    var studentLecturesInput = document.getElementById('studentLectures');

    if (!studentIdInput.value || !studentNameInput.value || !studentSurnameInput.value || !studentGrade1Input.value
        || !studentGrade2Input.value || !studentLecturesInput.value) {
        alert('Please fill in all fields.');
        return;
    }
    if (isNaN(studentIdInput.value) || parseInt(studentIdInput.value) <= 0) {
        alert('Please enter a valid positive numeric value for Student ID.');
        return;
    }
    if (isNaN(studentGrade1Input.value) || parseInt(studentGrade1Input.value) < 0 || parseInt(studentGrade1Input.value) > 100) {
        alert('Please enter a valid numeric value between 0 and 100 for Midterm Grade.');
        return;
    }
    if (isNaN(studentGrade2Input.value) || parseInt(studentGrade2Input.value) < 0 || parseInt(studentGrade2Input.value) > 100) {
        alert('Please enter a valid numeric value between 0 and 100 for Final Grade.');
        return;
    }
    if (studentLecturesInput.value === "---") {
        alert('Please select a lecture from the dropdown menu.');
        return;
    }
    if (studentIdInput.value.length < 9) {
        alert('Invalid ID. The student ID must be 9 digits.');
        return;
    }
    var existingStudent = findStudentById(parseInt(newStudentID.value));
    if (existingStudent) {
        studentNameInput.value = existingStudent.name;
        studentSurnameInput.value = existingStudent.surname;
        alert('Student with ID ' + studentIdInput.value + ' already exists. Form filled with existing data.');
        return;
    }

    var selectedCourseId = studentLecturesInput.value;
    var control = true;
    students.forEach(function (std) {
        if (std.id === studentIdInput.value) {
            var student = students.find(student => student.id === studentIdInput.value);
            if (student.lectures === studentLecturesInput.value) {
                control = false;
                alert('Student with ID ' + studentIdInput.value + ' has already selected the course ' + selectedCourseId + '.');
                return;
            }
        }
    });

    if (control) {
        var studentId = studentIdInput.value;
        var studentName = studentNameInput.value;
        var studentSurname = studentSurnameInput.value;
        var studentGrade1 = studentGrade1Input.value;
        var studentGrade2 = studentGrade2Input.value;
        var studentLectures = studentLecturesInput.value;

        var totalGrade = calculateTotalGrade(studentGrade1, studentGrade2);
        var letterGrade = calculateLetterGrade(totalGrade);
        console.log(letterGrade);

        var newStudent = new Student(studentId, studentName, studentSurname, studentGrade1, studentGrade2, studentLectures, letterGrade);

        students.push(newStudent);

        addStudentToLocalStorage(newStudent);

        studentIdInput.value = '';
        studentNameInput.value = '';
        studentSurnameInput.value = '';
        studentGrade1Input.value = '';
        studentGrade2Input.value = '';
        studentLecturesInput.value = '';
        control = true;
    }
});


document.getElementById('addLectureButton').addEventListener('click', function () {
    var lectureCodeInput = document.getElementById('lectureCode');
    var lectureNameInput = document.getElementById('lectureName');
    var lectureCreditInput = document.getElementById('lectureCredit');
    var lectureList = document.getElementById('lectureList');

    if (!lectureCodeInput.value || !lectureNameInput.value || !lectureCreditInput.value) {
        alert('Please fill in all fields.');
        return;
    }
    if (isNaN(lectureCreditInput.value) || parseInt(lectureCreditInput.value) <= 0) {
        alert('Please enter a valid positive numeric value for Lecture Credit.');
        return;
    }
    if (parseInt(lectureCreditInput.value) > 8) {
        alert('Lecture credit cannot exceed 8.');
        return;
    }

    var lectureCode = lectureCodeInput.value;
    var lectureName = lectureNameInput.value;
    var lectureCredit = lectureCreditInput.value;

    var newLecture = new Lecture(lectureCode, lectureName, lectureCredit);

    lectures.push(newLecture);
    addLectureToLocalStorage(newLecture);

    lectureCodeInput.value = '';
    lectureNameInput.value = '';
    lectureCreditInput.value = '';
    if (lectures.length !== 0) {
        lectureTableContainer.style.display = 'block';
    }
});


function addStudentToLocalStorage(student) {
    let existingStudents = JSON.parse(localStorage.getItem('students')) || [];
    existingStudents.push(student);
    localStorage.setItem('students', JSON.stringify(existingStudents));
    updateStudentList();
}

function addLectureToLocalStorage(lecture) {
    let existingLectures = JSON.parse(localStorage.getItem('lectures')) || [];
    existingLectures.push(lecture);
    localStorage.setItem('lectures', JSON.stringify(existingLectures));
    updateLectureList();
}


function initializeFromLocalStorage() {
    let storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    let storedLectures = JSON.parse(localStorage.getItem('lectures')) || [];

    students = storedStudents.map(studentJson => Student.fromJSON(studentJson));
    lectures = storedLectures.map(lectureJson => Lecture.fromJSON(lectureJson));
}

function updateStudentList() {
    var studentList = document.getElementById('studentList');
    studentList.innerHTML = ""; 
    students.forEach(function (student) {
        var studentInfoHTML = student.getStudentInfoHTML();
        var listItem = document.createElement('tr');
        listItem.classList.add('student-row');  
        listItem.innerHTML = studentInfoHTML;
        studentList.appendChild(listItem);
    });
}



function updateStudentList2() {
    var studentList = document.getElementById('studentList');
    studentList.innerHTML = "";

    let studentsFromLocalStorage = JSON.parse(localStorage.getItem("students")) || [];

    studentsFromLocalStorage.forEach(function (studentJson) {
        var student = Student.fromJSON(studentJson);
        var studentInfoHTML = student.getStudentInfoHTML();
        var listItem = document.createElement('tr');
        listItem.innerHTML = studentInfoHTML;
        studentList.appendChild(listItem);
    });
}

function updateLectureList2() {
    var lectureList = document.getElementById('lectureList');
    lectureList.innerHTML = "";
    let lecturesFromLocalStorage = JSON.parse(localStorage.getItem("lectures")) || [];
    lecturesFromLocalStorage.forEach(function (lectureJson) {
        var lecture = Lecture.fromJSON(lectureJson);
        var lectureInfoHTML = lecture.getLectureInfoHTML();
        var listItem = document.createElement('tr');
        listItem.innerHTML = lectureInfoHTML;
        lectureList.appendChild(listItem);
    });
}



function updateLectureList() {
    var lectureList = document.getElementById('lectureList');
    lectureList.innerHTML = "";
    lectures.forEach(function (lecture) {
        var lectureInfoHTML = lecture.getLectureInfoHTML();
        var listItem = document.createElement('tr');
        listItem.innerHTML = lectureInfoHTML;
        lectureList.appendChild(listItem);
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function populateLectureDropdown() {
    var lectureDropdown = document.getElementById('studentLectures');
    lectureDropdown.innerHTML = '';
    var option = document.createElement('option');
    option.value = "---";
    option.text = "---";
    lectureDropdown.appendChild(option);

    lectures.forEach(function (lecture) {
        var option = document.createElement('option');
        option.value = lecture.code; 
        option.text = lecture.name; 
        lectureDropdown.appendChild(option);
    });
}

function deleteLecture(code) {
    deleteLectureFromLocalStorage(code);
    deleteStudentsWithLecture(code);
    removeLectureFromTable();
    updateLectureList();
    if (lectures.length === 0) {
        lectureTableContainer.style.display = 'none';
    }
}

function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    updateStudentList();
}

function deleteLectureFromLocalStorage(code) {
    lectures = lectures.filter(lecture => lecture.code !== code);
    localStorage.setItem('lectures', JSON.stringify(lectures));
}

function deleteStudentsWithLecture(code) {
    students.forEach(student => {
        if (student.lectures === code) {
            student.grade1 = "";
            student.grade2 = "";
            student.letterGrade = "";
            student.lectures = "";
        }
    });
    updateStudentsInLocalStorage();
}
function updateStudentsInLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}
function updateLecturesInLocalStorage() {
    localStorage.setItem('lectures', JSON.stringify(lectures));
}


function removeLectureFromTable(code) {
    var lectureList = document.getElementById('lectureList');
    var rowToRemove = Array.from(lectureList.children).find(row => row.firstChild.textContent === code);
    if (rowToRemove) {
        lectureList.removeChild(rowToRemove);
    }
}

function calculateTotalGrade(midterm, final) {
    var totalGrade = (0.4 * parseFloat(midterm)) + (0.6 * parseFloat(final));
    return totalGrade;
}

function calculateLetterGrade(totalGrade) {
    if (totalGrade >= 90) {
        return 'A';
    } else if (totalGrade >= 80) {
        return 'B';
    } else if (totalGrade >= 70) {
        return 'C';
    } else if (totalGrade >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

function calculateLetterGrade7(totalGrade) {
    if (totalGrade >= 93) {
        return 'A';
    } else if (totalGrade >= 85) {
        return 'B';
    } else if (totalGrade >= 77) {
        return 'C';
    } else if (totalGrade >= 70) {
        return 'D';
    } else {
        return 'F';
    }
}

function addLetterToTable(student, letterGrade) {
    var studentList = document.getElementById('studentList');
    var studentInfoHTML = student.getStudentInfoHTML() +
        `<td>${letterGrade}</td>`;
    var listItem = document.createElement('tr');
    listItem.innerHTML = studentInfoHTML;
    studentList.appendChild(listItem);
}

function searchStudents() {
    var searchInput = document.getElementById('searchStudent').value.toLowerCase();
    var filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchInput) ||
        student.surname.toLowerCase().includes(searchInput)
    );
    updateStudentListForSearch(filteredStudents);
}

function searchStudentsByLecture() {
    var searchLectureInput = document.getElementById('searchLecture').value.toLowerCase();

    var filteredStudents = students.filter(student =>

        (student.lectures.toLowerCase().includes(searchLectureInput))
    );
    console.log(filteredStudents);
    updateStudentListForSearch(filteredStudents);
}

function updateStudentListForSearch(studentArray) {
    var studentList = document.getElementById('studentList');
    studentList.innerHTML = "";
    (studentArray || students).forEach(function (student) {
        var studentInfoHTML = student.getStudentInfoHTML();
        var listItem = document.createElement('tr');
        listItem.innerHTML = studentInfoHTML;
        studentList.appendChild(listItem);
    });
}
function printLetterGrade() {
    let studentList = [];
    studentList = JSON.parse(localStorage.getItem("students"));
    var gradeScale = document.getElementById("gradeScale");
    console.log(gradeScale.value);
    if (gradeScale.value.trim() === "7") {
        studentList.forEach(student => {
            var totalGrade = calculateTotalGrade(student.grade1, student.grade2);
            var letter = calculateLetterGrade7(totalGrade);
            console.log(letter);
            student.letterGrade = letter;
            localStorage.setItem("students", JSON.stringify(studentList));
        })
    }
    else {
        studentList.forEach(student => {
            var totalGrade = calculateTotalGrade(student.grade1, student.grade2);
            var letter = calculateLetterGrade(totalGrade);
            console.log(letter);
            student.letterGrade = letter;
            localStorage.setItem("students", JSON.stringify(studentList));

        })
    }
    updateStudentList2();
}

function populateLectureDropdownHome() {
    var courseSelect = document.getElementById('courseSelectHome');
    courseSelect.innerHTML = '';
    var option = document.createElement('option');
    option.value = "---";
    option.text = "---";
    courseSelect.appendChild(option);

    lectures.forEach(function (lecture) {
        var option = document.createElement('option');
        option.value = lecture.code;
        option.text = lecture.name;
        courseSelect.appendChild(option);
    });
}

function getFailedStudentsByCourse() {
    var selectedCourseCode = document.getElementById('courseSelectHome').value;
    console.log(selectedCourseCode);
    var studentsFromLocalStorage = JSON.parse(localStorage.getItem('students')) || [];
    var failedStudents = studentsFromLocalStorage.filter(student => {
        return student.lectures.includes(selectedCourseCode) && student.letterGrade === 'F';
    });
    displayFailedStudents(failedStudents);
}

function displayFailedStudents(failedStudents) {
    var failedStudentsList = document.getElementById('failedStudentsList');
    failedStudentsList.innerHTML = '';
    failedStudents.forEach(student => {
        var listItem = document.createElement('div');
        listItem.innerHTML = `<p>${student.name} ${student.surname} - ${student.letterGrade}</p>`;
        failedStudentsList.appendChild(listItem);
    });
}

function populateLectureDropdownHomeSucceded() {
    var courseSelect = document.getElementById('courseSelectHome2');
    courseSelect.innerHTML = '';
    var option = document.createElement('option');
    option.value = "---";
    option.text = "---";
    courseSelect.appendChild(option);
    lectures.forEach(function (lecture) {
        var option = document.createElement('option');
        option.value = lecture.code;
        option.text = lecture.name;
        courseSelect.appendChild(option);
    });
}

function resetDetails() {
    var failedStudentsList = document.getElementById('failedStudentsList');
    failedStudentsList.innerHTML = '';
    var succededStudentsList = document.getElementById('succededStudentsList');
    succededStudentsList.innerHTML = '';
    var studentListGpa = document.getElementById('studentListHome');
    studentListGpa.innerHTML = '';
}

function populateLectureDropdownHomeStudents() {
    var courseSelect = document.getElementById('selectStudentHome');
    courseSelect.innerHTML = '';
    var option = document.createElement('option');
    option.value = "---";
    option.text = "---";
    courseSelect.appendChild(option);
    var idSet = new Set();
    students.forEach(function (student) {
        if (!idSet.has(student.id)) {
            var option = document.createElement('option');
            option.value = student.id;
            option.text = student.name;
            courseSelect.appendChild(option);
            idSet.add(student.id);
        }
    });
}

function getStudentsListForHome() {
    var studentID = document.getElementById('selectStudentHome').value;
    var succededStudentsList = document.getElementById('studentListHome');
    var student = students.find(student => student.id === studentID);
    studentID === "---" ? succededStudentsList.innerHTML = '' : displayStudentsGpa(student.id);
}

function displayStudentsGpa(studentID) {
    var studentListGpa = document.getElementById('studentListHome');
    var student = students.find(student => student.id === studentID);
    var gpa = 0.0;
    var credit = 0;
    var total = 0;

    students.forEach(function (s) {
        if (s.id === studentID) {
            var lecture = lectures.find(lecture => lecture.code === s.lectures);
            credit = parseInt(lecture.credit) + credit;
            console.log(credit);
            total += convertLetterToGpa(s.letterGrade) * lecture.credit;
        }
    })

    gpa = total / credit;
    studentListGpa.innerHTML = '';

    var listItem = document.createElement('div');
    listItem.innerHTML = `<p>${student.name} ${student.surname} - ${gpa.toFixed(2)}</p>`;
    studentListGpa.appendChild(listItem);
}



function getSuccededStudentsByCourse() {
    var selectedCourseCode = document.getElementById('courseSelectHome2').value;
    console.log(selectedCourseCode);

    var studentsFromLocalStorage = JSON.parse(localStorage.getItem('students')) || [];

    var succededStudents = studentsFromLocalStorage.filter(student => {
        return student.lectures.includes(selectedCourseCode) && student.letterGrade !== 'F';
    });
    console.log(succededStudents.name);
    displaySuccededStudents(succededStudents);
}

function displaySuccededStudents(succededStudents) {
    var succededStudentsList = document.getElementById('succededStudentsList');
    succededStudentsList.innerHTML = '';
    succededStudents.forEach(student => {
        var listItem = document.createElement('div');
        listItem.innerHTML = `<p>${student.name} ${student.surname} - ${student.letterGrade}</p>`;
        succededStudentsList.appendChild(listItem);
    });
}

function updateStudent(studentId, lectures) {
    var studentToUpdate = students.find(student => student.id === studentId && student.lectures === lectures);
    if (!studentToUpdate) {
        alert('Öğrenci bulunamadı.');
        return;
    }
    var updateForm = `
        <div class="updateStudentContainer">
           <div>
            <form>
                <h2>Update Student</h2>
                <label for="updateName">Name:</label>
                <input type="text" id="updateName" value="${studentToUpdate.name}" required>
                <label for="updateSurname">Surname:</label>
                <input type="text" id="updateSurname" value="${studentToUpdate.surname}" required>
                <label for="updateGrade1">Midterm:</label>
                <input type="number" id="updateGrade1" value="${studentToUpdate.grade1}" required>
                <label for="updateGrade2">Final:</label>
                <input type="number" id="updateGrade2" value="${studentToUpdate.grade2}" required>
                <button id="confirmButton" onclick="confirmUpdate('${studentId}','${lectures}')">Onayla</button>
                </form>
           </div> 
        </div>
    `;
    document.getElementById('contentArea').innerHTML = updateForm;
}

function confirmUpdate(studentId, lectures) {
    var studentToUpdate = students.find(student => student.id === studentId && student.lectures === lectures);
    if (!studentToUpdate) {
        alert('Öğrenci bulunamadı.');
        return;
    }
    var updatedName = document.getElementById('updateName').value;
    var updatedSurname = document.getElementById('updateSurname').value;
    var updatedGrade1 = document.getElementById('updateGrade1').value;
    var updatedGrade2 = document.getElementById('updateGrade2').value;

    var totalGrade = calculateTotalGrade(updatedGrade1, updatedGrade2);
    var letterGrade = calculateLetterGrade(totalGrade);

    if (!isValidName(updatedName) || !isValidName(updatedSurname)) {
        alert('Geçerli bir ad veya soyad giriniz.');
        return;
    }

    if (!isValidGrade(updatedGrade1) || !isValidGrade(updatedGrade2)) {
        alert('Notlar için geçerli bir değer giriniz.');
        return;
    }

    studentToUpdate.name = updatedName;
    studentToUpdate.surname = updatedSurname;
    studentToUpdate.grade1 = updatedGrade1;
    studentToUpdate.grade2 = updatedGrade2;
    studentToUpdate.letterGrade = letterGrade;

    updateStudentsInLocalStorage();
    changeContent("Students");
    updateStudentList2();
    console.log("denme");
}

function isValidName(name) {
    return /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(name);
}
function isValidGrade(grade) {
    return !isNaN(grade) && grade >= 0 && grade <= 100;
}

function convertLetterToGpa(letter) {
    if (letter === 'A') {
        return 4;
    }
    else if (letter === 'B') {
        return 3;
    }
    else if (letter === 'C') {
        return 2;
    }
    else if (letter === 'D') {
        return 1;
    }
    else if (letter === 'F') {
        return 0;
    }
}


function updateLecture(lectureCode) {
    var lectureToUpdate = lectures.find(lecture => lecture.code === lectureCode);
    if (!lectureToUpdate) {
        alert('Ders bulunamadı.');
        return;
    }
    var updateForm = `
        <div class="updateLectureContainer">
            <div>
                <form>
                    <h2>Update Student</h2>
                    <label for="updateLectureName">Lecture Name:</label>
                    <input type="text" id="updateLectureName" value="${lectureToUpdate.name}" required>
                    <label for="updateLectureCredit">Lecture Credit:</label>
                    <input type="text" id="updateLectureCredit" value="${lectureToUpdate.credit}" required>
                    <button id="confirmButton" onclick="confirmUpdateForLecture('${lectureCode}')">Update</button>
                </form>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = updateForm;
}
function confirmUpdateForLecture(lectureCode) {
    var lectureToUpdate = lectures.find(lecture => lecture.code === lectureCode);
    if (!lectureToUpdate) {
        alert('Ders bulunamadı.');
        return;
    }
    var updatedLectureName = document.getElementById('updateLectureName').value;
    var updatedLectureCredit = document.getElementById('updateLectureCredit').value;
    if (!updatedLectureName || !updatedLectureCredit) {
        alert('Please fill in all fields.');
        return;
    }
    if (isNaN(updatedLectureCredit) || parseInt(updatedLectureCredit) <= 0) {
        alert('Please enter a valid positive numeric value for Lecture Credit.');
        return;
    }
    if (parseInt(updatedLectureCredit) > 8) {
        alert('Lecture credit cannot exceed 8.');
        return;
    }

    lectureToUpdate.name = updatedLectureName;
    lectureToUpdate.credit = updatedLectureCredit;

    updateLecturesInLocalStorage();

    changeContent("Lectures");
    updateLectureList2();
}

function addStudentAuto() {
    var studentsAuto = [
        {
            id: "210709007",
            name: "Emily",
            surname: "Carter",
            grade1: 80,
            grade2: 75,
            lectures: "Calculus II",
            letterGrade: "C"
        },
        {
            id: "210709605",
            name: "James",
            surname: "Parker",
            grade1: 75,
            grade2: 50,
            lectures: "Database Management Systems",
            letterGrade: "C"
        },
        {
            id: "210709004",
            name: "Sophia",
            surname: "Mitchell",
            grade1: 88,
            grade2: 72,
            lectures: "Mobile Application Development",
            letterGrade: "C"
        },
        {
            id: "210709013",
            name: "Ava",
            surname: "Collins",
            grade1: 65,
            grade2: 70,
            lectures: "Web Development and Programming",
            letterGrade: "D"
        },
        {
            id: "2107090032",
            name: "Henry",
            surname: "Foster",
            grade1: 75,
            grade2: 60,
            lectures: "Artificial Intelligence",
            letterGrade: "D"
        },
        {
            id: "200709001",
            name: "Isabella",
            surname: "Reed",
            grade1: 95,
            grade2: 92,
            lectures: "Mobile Application Development",
            letterGrade: "A"
        },
        {
            id: "200709016",
            name: "Benjamin",
            surname: "Cooper",
            grade1: 70,
            grade2: 80,
            lectures: "Calculus II",
            letterGrade: "C"
        },
        {
            id: "210709082",
            name: "Mia",
            surname: "Sanders",
            grade1: 80,
            grade2: 90,
            lectures: "Basic Linear Algebra for Engineers",
            letterGrade: "B"
        },
        {
            id: "210709608",
            name: "Emma",
            surname: "Clark",
            grade1: 95,
            grade2: 90,
            lectures: "Artificial Intelligence",
            letterGrade: "A"
        },
        {
            id: "210709092",
            name: "Taylor",
            surname: "Knight",
            grade1: 85,
            grade2: 100,
            lectures: "Computer Networks",
            letterGrade: "A"
        },
    ];

    if (students.length === 0) {
        for (var i = 0; i < studentsAuto.length; i++) {
            var student = studentsAuto[i];
            var newStudent = new Student(student.id, student.name, student.surname, student.grade1, student.grade2, student.lectures, student.letterGrade);
            students.push(newStudent);
            addStudentToLocalStorage(newStudent);
        }
    }
    else {
        return;
    }
}
function addLectureAuto() {
    var coursesAuto = [
        {
            code: "CENG3005",
            credit: "6",
            name: "Database Management Systems"
        },
        {
            code: "CENG3545",
            credit: "6",
            name: "Mobile Application Development"
        },
        {
            code: "CENG3007",
            credit: "6",
            name: "Computer Networks"
        },
        {
            code: "CENG3507",
            credit: "6",
            name: "Web Development and Programming"
        },
        {
            code: "CENG3511",
            credit: "6",
            name: "Artificial Intelligence"
        },
        {
            code: "MATH1852",
            credit: "6",
            name: "Calculus II"
        },
        {
            code: "MATH1856",
            credit: "6",
            name: "Basic Linear Algebra for Engineers"
        },
        
    ];

    if (lectures.length === 0) {
        for (var i = 0; i < coursesAuto.length; i++) {
            var course = coursesAuto[i];
            console.log(course);
            var newLecture = new Lecture(course.code, course.name, course.credit);
            lectures.push(newLecture);
            addLectureToLocalStorage(newLecture);
        }
    }
    else {
        return;
    }
}