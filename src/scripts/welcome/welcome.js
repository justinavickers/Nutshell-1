import printToDOM from "./printToDOM";
import welcomeForms from "./welcomeForms";
import welcomeApiManager from "./welcomeApiManager";
import newsHTMLFactory from "../newsFeed/newsHTMLFactory"
import onLoad from "../chat/onLoad"
import eventHandler from "../chat/eventHandler"
import findFriendIds from "../friends/findFriendIds"
import taskForm from "../Tasks/taskForm"
import taskToDOM from "../Tasks/taskToDOM";
import navbarBuilder from "../navbar/navbarHTML"
import showEvents from "../events/events";

const welcome = {
    welcome: (form) => {
        const activeUser = sessionStorage.getItem("activeUser")
        if (activeUser === null) {
            printToDOM(form, "#welcomeForm")
        } else {
            welcome.showDashboard(activeUser)
        }
    },
    register: () => {
        //GET existing users
        welcomeApiManager.getUsers()
            .then(usersData => {
                const allUserNames = usersData.map(user => {
                    return user.username.toLowerCase()
                })
                const allEmails = usersData.map(user => {
                    return user.email.toLowerCase()
                })
                //capture input values
                const newUserObject = {
                    first_name: document.querySelector("#registration_firstName").value,
                    last_name: document.querySelector("#registration_lastName").value,
                    username: document.querySelector("#registration_username").value,
                    email: document.querySelector("#registration_email").value,
                    password: document.querySelector("#registration_password").value
                }

                // check if username is unique, alert if not unique
                if (allUserNames.includes(newUserObject.username.toLowerCase())) {
                    window.alert("This username already exists.")
                    document.querySelector("#registration_username").focus()
                    document.querySelector("#registration_username").select()

                    // check if email is unique, alert if not unique
                } else if (allEmails.includes(newUserObject.email.toLowerCase())) {
                    window.alert("There is already an account associated with this email adress.")
                    document.querySelector("#registration_email").focus()
                    document.querySelector("#registration_email").select()

                    //POST new user object if unique
                } else {
                    alert(`All hail Lord ${newUserObject.first_name}!!!`)
                    welcomeApiManager.postUsers(newUserObject)
                        .then(user => {
                            console.log("posted!", user)
                            sessionStorage.setItem("activeUser", user.id)
                            welcome.showDashboard(user.id)
                        })

                    //pass new user object into login function
                    // .then(user => login(user))
                }
            })


    },
    login: () => {
        //GET users
        welcomeApiManager.getUsers()
            .then(userData => {
                //capture values from inputs
                const loginUsername = document.querySelector("#login_username").value
                const loginPassword = document.querySelector("#login_password").value

                //compare id and password
                const userToCheck = userData.find(user => user.username === loginUsername)
                if (userToCheck === undefined) {
                    alert("Username or password incorrect")
                    welcome.welcome(welcomeForms.loginForm)

                } else if (userToCheck.password === loginPassword) {
                    //if verified, capture userId in sessionStorage
                    sessionStorage.setItem("activeUser", userToCheck.id)
                    //go to dashboard
                    welcome.showDashboard(userToCheck.id)
                } else {
                    alert("Username or password incorrect")
                    welcome.welcome(welcomeForms.loginForm)
                }
            })
    },
    showDashboard: (activeUserId) => {
        console.log(activeUserId)
        document.querySelector("#welcomeForm").innerHTML = ""
        fetch(`http://localhost:8088/users/${activeUserId}`)
            .then(r => r.json())
            .then(data => {
                const username = ` ${data.username}`
                navbarBuilder(username)
                newsHTMLFactory(activeUserId)
                document.getElementById("taskList-input").innerHTML = taskForm
                taskToDOM(activeUserId)
                showEvents(activeUserId)
                onLoad.loadInitialHTML()
                findFriendIds()
                onLoad.outputAllMessages()
                eventHandler.editListener()
                eventHandler.messageListener()
                eventHandler.nameFriendListener()
                eventHandler.addFriendListener()
                onLoad.loadUserFriendships()
            })


    }
}

export default welcome