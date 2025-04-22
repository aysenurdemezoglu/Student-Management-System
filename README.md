# Student Management System

A web-based Student Management System built using JavaScript, HTML, and CSS. The application allows managing student data, course information, grades, GPA calculation, and more with a user-friendly interface.

## Features

###  Student Information Management
- Add, update, and delete student records.
- Each student can register for multiple lectures.
- Grades (midterm & final) and letter grades are stored per student per lecture.
- GPA is calculated by considering **all** courses taken, including those failed.

###  Lecture Management
- Add, update, and delete lectures with course code, name, and credit.
- Automatically populate a list of default courses for demo purposes.
- Prevent duplicate course additions or students enrolling in the same course twice.

###  GPA Calculation
- GPA is automatically calculated based on all passed **and failed** courses, taking into account each course's credit and the student's letter grade.
- A GPA summary is displayed for a selected student on the Details page.
- Uses 4.0 scale for standard letter grade conversion (A=4, B=3, ..., F=0).

###  Student Performance View
- Filter students who passed or failed specific lectures.
- Passed students are those with letter grades other than 'F'.
- Failed students are listed only if they received an 'F' grade in that course.
- Results update dynamically based on the selected course.

###  Local Storage Support
- Data is persisted using `localStorage`, ensuring information is saved across browser sessions.
- On first load, the system populates default students and lectures if none are found.

###  Grade Conversion Support
- Option to choose between standard grading and 7-point grading scale.
- Letter grades update accordingly.

## Technologies Used
- **HTML/CSS** for layout and styling
- **Vanilla JavaScript** for logic and DOM manipulation
- **localStorage** for data persistence

## How to Run
1. Clone the repository
```bash
git clone https://github.com/aysenurdemezoglu/Student-Management-System.git
```
2. Open `index.html` in a browser.

## Contributing
Contributions are welcome! 🎉

If you’d like to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your branch:
   ```bash
   git push origin your-feature-name
   ```
5. Open a Pull Request.

---


