// import eventApiManager from "./events/eventApiManager";
// import printEvents from "./events/eventPrint";
import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"
import navbarBuilder from "./navbar/navbarHTML";
import newsEventListener from "./newsFeed/newsEventListenerHandler"
import taskListeners from "./Tasks/taskListeners"
import eventsEventListeners from "./events/eventsEventHandler"

navbarBuilder("")
welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()
eventsEventListeners.all()
newsEventListener.inputContainer()
newsEventListener.articleContainer()
taskListeners.completedTask()
taskListeners.addTask()
taskListeners.showEditTaskForm()
// eventApiManager.getEvents()
    // .then(eventsData => printEvents(eventsData))
