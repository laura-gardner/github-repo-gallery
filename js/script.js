// Variable targeting .overview div 
const overview = document.querySelector('.overview');

// Variable containing github username
const username = 'laura-gardner';

//Variable targeting unordered list for repo
const repoList = document.querySelector('.repo-list');

//Variable to select section with class of repos
const reposSection = document.querySelector('.repos');

//Variable to select the section with class of repo-data
const repoData = document.querySelector('.repo-data');

//Function to fetch data from API (users endpoint)
const getData = async () => {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const data = await res.json();
    displayData(data);
}

//Function to display the fetched user information on the page
const displayData = async (data) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('user-info');
    newDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    overview.appendChild(newDiv);
    getRepoList();
};

getData();

const getRepoList = async () => {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const data = await res.json();
        displayRepos(data);
    } catch (e) {
        console.log("There was an error!")
        console.error(e)
    }
}

const displayRepos = async (repos) => {
    try {
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.classList.add('repo');
            repoItem.innerHTML = `<h3>${repo.name}</h3>`;
            repoList.append(repoItem);
        });
        }
    catch (e) {
        console.log("There was an error!")
        console.log(e)
    }
}

repoList.addEventListener('click', function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSpecificRepoInfo(repoName);
    };
})

const getSpecificRepoInfo = async (repoName) => {
    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        const repoInfo = await res.json();
        const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
        const languageData = await fetchLanguages.json();
        const languages = [];
        for (let key in languageData) {
            languages.push(key)
        }
        displaySpecificRepoInfo(repoInfo, languages);
 } catch (e) {
        console.log("There was an error!")
        console.log(e)
    }
}

const displaySpecificRepoInfo = async (repoInfo, languages) => {
    repoData.innerHTML = "";
    const repoDiv = document.createElement('div');
    repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoData.append(repoDiv);
    repoData.classList.toggle('hide');
    reposSection.classList.toggle('hide');
}