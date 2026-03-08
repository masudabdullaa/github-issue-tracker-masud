function viewIssues() {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then(res => res.json())
        .then(data => displayIssue(data.data))
}

// {
//     "id": 47,
//     "title": "Add code syntax highlighting",
//     "description": "Implement syntax highlighting for code blocks in comments and descriptions.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "low",
//     "author": "syntax_simon",
//     "assignee": "",
//     "createdAt": "2024-01-25T11:00:00Z",
//     "updatedAt": "2024-01-25T11:00:00Z"
// }

const allIssues = document.getElementById("issue-card-container");
allIssues.innerHTML = "";

const displayIssue = (issues) => {
    // console.log(issues);
    issues.forEach(issue => {
        console.log(issue);
        const cards = document.createElement("div");
        cards.innerHTML = `
    <div class="rounded-lg p-3 shadow-lg space-y-5">
                <div class="flex justify-between">
                <div>${issue.status == "open"? `<img class="w-[40px]" src="./assets/Open-Status.png" alt="">`: `<img src="./assets/Closed- Status .png" alt="">`}</div>
                    
                    <button class="badge rounded-full py-4 px-5 bg-rose-200 font-bold text-rose-800">${issue.priority}</button>
                </div>
                <h2 class="font-bold text-xl">${issue.title}</h2>
                <p class="text-gray-500">${issue.description}</p>
                <div class="flex items-center space-x-5">
                    <button class="btn btn-outline btn-secondary rounded-full">BUG</button>
                    <button class="btn btn-outline btn-warning rounded-full">HELP WANTED</button>
                </div>
                <p>1 by john_doe</p>
                <p>1/15/2024</p>
            </div>
    `;
        allIssues.appendChild(cards);
    });

}

viewIssues();