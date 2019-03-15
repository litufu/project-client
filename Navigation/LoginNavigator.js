import { createStackNavigator } from 'react-navigation'

import Login from '../Components/Login'
import Register from '../Components/Register'
import UserAgreement from '../Components/UserAgreement'
import Privacy from '../Components/Privacy'


export default createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        },
        UserAgreement:{
            screen: UserAgreement
        },
        Privacy:{
            screen: Privacy
        }

    },
    {
        navigationOptions: {
            header: null
        }
    }
)
