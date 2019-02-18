// import eventApiManager from "./events/eventApiManager";
// import printEvents from "./events/eventPrint";
import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"
import navbarBuilder from "./navbar/navbarHTML";
import moment from "moment"

navbarBuilder()
welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()

// eventApiManager.getEvents()
    // .then(eventsData => printEvents(eventsData))