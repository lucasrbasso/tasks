import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import TaskList from './screens/TaskList'
import Auth from './screens/Auth'

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },

    Home: {
        name: 'Home',
        screen: TaskList
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth'
})

export default createAppContainer(mainNavigator)