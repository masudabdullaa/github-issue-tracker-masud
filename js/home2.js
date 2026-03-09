const allIssues = document.getElementById("issue-card-container");


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

            // count show
            document.getElementById("issue-count").innerText = allIssueData.length;

            displayIssue(allIssueData);
        });
}

allIssues.innerHTML = "";

const displayIssue = (issues) => {
    // console.log(issues);
    issues.forEach(issue => {
        // console.log(issue);
        const cards = document.createElement("div");
        const date = new Date(issue.createdAt);
        const dateFormat = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        cards.innerHTML = `
    <div class="rounded-lg p-3 shadow-lg space-y-5 h-full">
                <div class="flex justify-between items-center">
                <div>${issue.status == "open" ? `<img class="w-[40px]" src="./assets/Open-Status.png" alt="">`
                : `<img class="w-[40px]" src="./assets/Closed- Status .png" alt="">`}</div>
                    <button class=" rounded-full px-5 ${issue.priority == "high" ? "bg-red-100 text-red-700" : issue.priority == "medium" ? "bg-orange-100 text-orange-700" : "bg-violet-100 text-violet-700"}">${issue.priority}</button>
                </div>
                <h2 class="font-bold text-xl">${issue.title}</h2>
                <p class="text-gray-500 line-clamp-2">${issue.description}</p>
                <div class="flex items-center space-x-5">
                    <button class="btn btn-outline btn-secondary rounded-full">BUG</button>
                    <button class="btn btn-outline btn-warning rounded-full">HELP WANTED</button>
                </div>
                <p>${issue.author}</p>
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
