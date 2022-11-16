// Variable targeting .overview div 
const overview = document.querySelector('.overview');

// Variable containing github username
const username = 'laura-gardner';

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
};

getData();