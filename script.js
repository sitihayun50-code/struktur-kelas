// ======================================
// DATA SISWA
// ======================================

let students =
    JSON.parse(localStorage.getItem("classStudents")) || [
        "Ahmad Fauzan",
        "Budi Setiawan",
        "Citra Lestari",
        "Dimas Pratama",
        "Fajar Ramadhan",
        "Rizky Maulana",
        "Nazwa Putri",
        "Andi Saputra"
    ];


// ======================================
// RENDER SISWA
// ======================================

function renderStudents() {

    const list =
        document.getElementById("studentList");

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    list.innerHTML = "";

    const filtered =
        students.filter(student =>
            student.toLowerCase().includes(search)
        );

    document.getElementById("totalSiswa").textContent =
        students.length;


    const empty =
        document.getElementById("emptyMessage");


    if (filtered.length === 0) {

        empty.style.display = "block";

        return;

    } else {

        empty.style.display = "none";

    }


    filtered.forEach((student) => {

        const index =
            students.indexOf(student);

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <strong>${escapeHTML(student)}</strong>
            </td>

            <td>
                <span class="status">
                    AKTIF
                </span>
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Hapus
                </button>
            </td>
        `;


        list.appendChild(row);

    });

}


// ======================================
// TAMBAH SISWA
// ======================================

function addStudent() {

    const name =
        prompt("Masukkan nama siswa:");

    if (!name) return;


    const cleanName =
        name.trim();


    if (cleanName.length < 2) {

        alert("Nama siswa terlalu pendek.");

        return;

    }


    if (
        students.some(
            student =>
            student.toLowerCase() ===
            cleanName.toLowerCase()
        )
    ) {

        alert("Nama siswa sudah ada.");

        return;

    }


    students.push(cleanName);

    saveStudents();

    renderStudents();

}


// ======================================
// HAPUS SISWA
// ======================================

function deleteStudent(index) {

    const name =
        students[index];


    const confirmDelete =
        confirm(
            `Hapus "${name}" dari daftar siswa?`
        );


    if (!confirmDelete) return;


    students.splice(index, 1);

    saveStudents();

    renderStudents();

}


// ======================================
// SAVE
// ======================================

function saveStudents() {

    localStorage.setItem(
        "classStudents",
        JSON.stringify(students)
    );

}


// ======================================
// DARK MODE
// ======================================

function toggleTheme() {

    document.body.classList.toggle("dark");


    const dark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "classDarkMode",
        dark
    );


    updateThemeButton();

}


function updateThemeButton() {

    const button =
        document.getElementById("themeButton");


    const dark =
        document.body.classList.contains("dark");


    button.textContent =
        dark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

}


// ======================================
// SIDEBAR MOBILE
// ======================================

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


// ======================================
// TANGGAL
// ======================================

function updateDate() {

    const now = new Date();


    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };


    document.getElementById("dateBox")
        .textContent =
        now.toLocaleDateString(
            "id-ID",
            options
        );

}


// ======================================
// SECURITY
// ======================================

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ======================================
// LOAD
// ======================================

if (
    localStorage.getItem("classDarkMode")
    === "true"
) {

    document.body.classList.add("dark");

}


renderStudents();

updateThemeButton();

updateDate();
