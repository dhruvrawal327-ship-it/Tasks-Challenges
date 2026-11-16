const initialStudents= [
    {name:"Aarav", marks:85},
    {name:"Priya", marks:34},
    {name:"Rohan", marks:62}
];

function checkResult(marks) {
    if (marks>=40) {
        return "Pass";
    } else {
        return "Fail";
    }   
}

function showStudent(name, marks, result) {
    const resultList= document.getElementById("resultList");

    const listItem= document.createElement("li");

    const statusClass= result === "Pass" ? "pass" : "fail";

    listItem.innerHTML = `<strong>${name}</strong> - Marks: ${marks} | Result: <span class= "${statusClass}">${result}</span>`;

    resultList.appendChild(listItem);
}

for (let i = 0; i < initialStudents.length; i++) {
    let currentName = initialStudents[i].name;
    let currentMarks = initialStudents[i].marks;
    let status = checkResult(currentMarks);

    showStudent( currentName, currentMarks, status);
    
}

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener( "click", function(){

    const nameInput = document.getElementById("studentName");
    const marksInput = document.getElementById("studentMarks");

    const name = nameInput.value.trim();
    const marks = Number(marksInput.value);

    if ( name === "" || marksInput.value === ""){
        alert("Please enter both name and marks.");
        return;
    }

    const result = checkResult(marks);
    showStudent(name, marks, result);

    nameInput.value = "";
    marksInput.value = "";
})