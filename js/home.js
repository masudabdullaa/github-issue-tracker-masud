const allIssues = document.getElementById("issue-card-container");
const issueDetailsModal = document.getElementById("issue_details_modal");

const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalAuthor = document.getElementById("modal-author");
const modalAuthors = document.getElementById("modal-authors");
const modalCreatedDate = document.getElementById("modal-createdDate");
const modalDescription = document.getElementById("modal-description");
const modalPriority = document.getElementById("modal-priority");

function viewIssues() {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res => res.json())
    .then(data => displayIssue(data.data))
}
let allIssueData = [];
function viewIssues() {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        allIssueData = data.data;
        document.getElementById("issue-count").innerText = allIssueData.length;
        
        displayIssue(allIssueData);
    });
}

allIssues.innerHTML = "";

const displayIssue = (issues) => {
    // console.log(issues);
    issues.forEach(issue => {
        console.log(issue);
        const cards = document.createElement("div");
        const date = new Date(issue.createdAt);
        const dateFormat = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
        cards.innerHTML = `
    <div class="rounded-lg p-3 shadow-lg space-y-5 h-full">
                <div class="flex justify-between items-center">
                <div>${issue.status == "open" ? `<img class="w-[40px]" src="./assets/Open-Status.png" alt="">`
                : `<img class="w-[40px]" src="./assets/Closed- Status .png" alt="">`}</div>
                    <button class=" rounded-full px-5 ${issue.priority == "high" ? "bg-red-100 text-red-700" : issue.priority == "medium" ? "bg-orange-100 text-orange-700" : "bg-violet-100 text-violet-700"}">${issue.priority}</button>
                </div>
                <h2 class="font-bold text-xl" onclick="openIssueModal(${issue.id})">${issue.title}</h2>
                <p class="text-gray-500 line-clamp-2">${issue.description}</p>
                <div class="flex items-center space-x-5">
                    <button class="btn btn-outline btn-secondary rounded-full">BUG</button>
                    <button class="btn btn-outline btn-warning rounded-full">HELP WANTED</button>
                </div>
                <p>#${issue.author}</p>
                <p>${dateFormat}</p>
            </div>
    `;

        allIssues.appendChild(cards);
    });

}

viewIssues();

let currentbtn = "all";
const btnActive = ["btn-primary"];
const btnInactive = ["bg-transparent", "text-slate-700", "border-slate-200"];

function loadIssues(btn){
    // console.log(btn);
    const btns = ["all", "open", "closed"];
    for(const button of btns){
        const btnName = document.getElementById("btn-" + button);
        if(button == btn){
            btnName.classList.remove(...btnInactive);
            btnName.classList.add(...btnActive);
        }else{
            btnName.classList.add(...btnInactive);
            btnName.classList.remove(...btnActive);
        } 
    }
}
loadIssues(currentbtn);

async function openIssueModal(issueId){
    console.log("Issue ID:", issueId);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await res.json();
    const datas = (data.data);
    modalTitle.textContent = datas.title;
    modalStatus.textContent = datas.status;
    modalAuthor.textContent = datas.author;
    modalAuthors.textContent = datas.author;
    //         const date = new Date(datas.createdAt);
    //     const dateFormat = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    
    // modalCreatedDate.textContent = datas.dateFormat;
    modalDescription.textContent = datas.description;
    modalPriority.textContent = datas.priority;


    issueDetailsModal.showModal();
}

// ----------------

// {
//     "id": 48,
//     "title": "Browser console shows warnings",
//     "description": "Multiple deprecation warnings appearing in browser console. Need to update deprecated code.",
//     "status": "open",
//     "labels": [
//         "bug"
//     ],
//     "priority": "low",
//     "author": "console_carol",
//     "assignee": "",
//     "createdAt": "2024-02-09T14:20:00Z",
//     "updatedAt": "2024-02-09T14:20:00Z"
// }
// -------------------