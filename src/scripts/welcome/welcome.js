import printToDOM from "./printToDOM";
import welcomeForms from "./welcomeForms";
import welcomeApiManager from "./welcomeApiManager";
// import welcomeEventHandlers from "./welcomeEventHandler";

const welcome = {
    welcome: (form) => {
        printToDOM(form, "#welcomeForm")
    },
    register: () => {
        //GET existing users
        welcomeApiManager.getUsers()
            .then(usersData => {
                console.log(usersData)
                const allUserNames = usersData.map(user => {
                    return user.username
                })
                console.log(allUserNames)
                const allEmails = usersData.map(user => {
                    return user.email
                })
                //capture input values
                const newUserObject = {
                    first_name: document.querySelector("#registration_firstName").value,
                    last_name: document.querySelector("#registration_lastName").value,
                    username: document.querySelector("#registration_username").value,
                    email: document.querySelector("#registration_email").value,
                    password: document.querySelector("#registration_password").value
                }

                console.log(allEmails)
                //compare to make sure email and username are unique
                if (allUserNames.includes(newUserObject.username)) {
                    window.alert("This username already exists.")

                //alert if not unique
                } else if (allEmails.includes(newUserObject.email)) {
                    window.alert("There is already an account associated with this email adress.")

                //POST new user object if unique
                } else {
                    alert(`All hail Lord ${newUserObject.first_name}!!!`)
                    welcomeApiManager.postUsers(newUserObject)

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
                const loginUsername = document.querySelector("#login_username")
                const loginPassword = document.querySelector("#login_password")

                //compare id and password
                userData.forEach(user => {
                    if (user.username === loginUsername && user.password === loginPassword) {

                    } else {
                        alert("Username or password incorrect")
                        welcome.welcome(welcomeForms.loginForm)
                    }
                });


            })
        //if verified, capture userId in sessionStorage
        //go to dashboard
    }
}

export default welcome