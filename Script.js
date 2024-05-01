const userID = 1;
const randomUserID = Math.floor(Math.random() * 10) + 1;

window.onload = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${randomUserID}`)
        .then(res => res.json())
        .then(user => {
            document.querySelector('.ProfileSideBar h1').innerHTML = user.name;
            document.querySelector('.Dashboard h1').innerHTML = `Welcome ${user.name}!`;
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
        });
}

document.querySelector('.actionBTN').addEventListener('click', function () {
    const dashboard = document.querySelector('.Dashboard');
    const backgroundImage = dashboard.querySelector('.BackgroundIMG');
    if (backgroundImage) {
        backgroundImage.remove();
    }
    dashboard.style.backgroundColor = 'white';
    dashboard.innerHTML =
        `<div class="ProjectHeadliner "> 
            <div class="ProjectDescription" >
                <h1>Project Title</h1>
                <h3>Short description</h3>
            </div>
            <div class="ProjectDate" >
                <h2> Due Date </h2>
                <h3></h3>
            </div>
            <button id="PostTicket"> Create new Ticket</button>   
        </div>
        <div id="TicketBoard">
            <div class="TicketLine">
                <div class="TicketGroup">
                    <h2 class="TicketStatus">Backlog</h2> 
                    <img class="ExpandStatus" src="/Media/arrowdown.png" alt="Expand Icon"> 
                </div>
                <div class="TicketGroup">
                    <h2 class="TicketStatus">In Progress</h2> 
                    <img class="ExpandStatus" src="/Media/arrowdown.png" alt="Expand Icon"> 
                </div>
                <div class="TicketGroup">
                    <h2 class="TicketStatus">Review</h2> 
                    <img class="ExpandStatus" src="/Media/arrowdown.png" alt="Expand Icon">
                </div>
            </div>
            <div class="TicketsContainer">
                 <div class="TicketGrid"></div>
                <div class="TicketGrid"></div>
                <div class="TicketGrid"></div>
            </div>
        </div>`;


    let ticketCount = 0;

    document.getElementById('PostTicket').addEventListener('click', function () {
        if (ticketCount < 2) {
            fetch(`https://jsonplaceholder.typicode.com/posts`)
                .then(res => res.json())
                .then(posts => {
                    const container = document.querySelector('.TicketsContainer');
                    posts.slice(0, 3).forEach(post => {
                        const ticket = document.createElement('div');
                        ticket.classList.add('TicketGrid');
                        ticket.style.border = '1px solid transparent';
                        ticket.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.5)';
                        ticket.innerHTML = `
                        <img src="/Media/user.png" alt="User Icon">
                        <h3>${post.title}</h3>
                        <hr>
                        <p>${post.body}</p>
                    `;
                        container.appendChild(ticket);
                    });
                    ticketCount++;
                    if (ticketCount >= 2) {
                        document.getElementById('PostTicket').disabled = true;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });



    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    const futureDateElement = document.querySelector('.ProjectDate h3');
    futureDateElement.textContent = `Due: ${futureDate.toDateString()}`;
});
