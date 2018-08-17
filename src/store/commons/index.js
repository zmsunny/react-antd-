import state from './state'
import { 
    CHANGE_USER_STATE,
    CHANGE_MENU_CONFIG
} from './const'

const reducer = (previousState = state, action) => {
        let new_state = { ...previousState }

        switch ( action.type ) {
           case CHANGE_USER_STATE:
                new_state.user_state = action.user_state
           break;

           case CHANGE_MENU_CONFIG:
                new_state.menu_config = action.menu_config
           break;

            default: break;
        }

        return new_state

}

export default reducer


