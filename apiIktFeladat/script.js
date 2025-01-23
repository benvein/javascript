const coursesAPI_URL = "https://vvri.pythonanywhere.com/api/courses";
const studentsAPI_URL = "https://vvri.pythonanywhere.com/api/students";


function showSection(section) {
    document.getElementById('courses').classList.add('hidden');
    document.getElementById('students').classList.add('hidden');
    document.getElementById(section).classList.remove('hidden');

    if (section === 'courses') {
        fetchCourses();
    } else {
        fetchStudents();
    }
}

async function fetchCourses() {
    const response = await fetch(coursesAPI_URL);
    const courses = await response.json();
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';

    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>
                <button onclick="editCourse(${course.id}, '${course.name}')">Edit</button>
                <button onclick="deleteCourse(${course.id})">Delete</button>
            </td>
        `;
        courseList.appendChild(row);
    });
}

async function addCourse() {
    const name = prompt("Enter course name:");
    if (!name) return;

    await fetch(coursesAPI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    fetchCourses();
}

async function editCourse(id, currentName) {
    const name = prompt("Edit course name:", currentName);
    if (!name) return;

    try {
        const response = await fetch(`${coursesAPI_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }) // Ellenőrizzük, hogy az API pontosan ezt a formát várja-e
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("Error editing course:", result);
            throw new Error(`Failed to edit course: ${response.status} - ${result.message || response.statusText}`);
        }

        alert("Course edited successfully!");
        fetchCourses();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }   
}

async function deleteCourse(id) {
    if (!confirm("Are you sure you want to delete this course?")) return;

    await fetch(`${coursesAPI_URL}/${id}`, {
        method: 'DELETE'
    });

    fetchCourses();
}


async function fetchStudents() {
    const response = await fetch(studentsAPI_URL);
    const students = await response.json();
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>
                <button onclick="editStudent(${student.id}, '${student.name}')">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

async function addStudent() {
    const name = prompt("Enter student name:");
    if (!name) return;

    try {
        const response = await fetch(studentsAPI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }) // Ellenőrizzük, hogy az API pontosan ezt a formát várja-e
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("Error adding student:", result);
            throw new Error(`Failed to add student: ${response.status} - ${result.message || response.statusText}`);
        }

        alert("Student added successfully!");
        fetchStudents();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}


async function editStudent(id, currentName) {
    const name = prompt("Edit student name:", currentName);
    if (!name) return;

    try {
        const response = await fetch(`${studentsAPI_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }) // Ellenőrizzük, hogy az API pontosan ezt a formát várja-e
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("Error editing student:", result);
            throw new Error(`Failed to edit student: ${response.status} - ${result.message || response.statusText}`);
        }

        alert("Student edited successfully!");
        fetchStudents();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
        const response = await fetch(`${studentsAPI_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Failed to delete student");
        fetchStudents();
    } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the student.");
    }
}
