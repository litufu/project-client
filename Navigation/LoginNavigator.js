import { createStackNavigator } from 'react-navigation'

import Login from '../Components/Login'
import Register from '../Components/Register'


export default createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)
