// components that are lazy loaded shouldn't have state here
// what happens when you want to load state from a component that is lazy loaded but hasn't been accessed yet?

import { UserState } from '../user/state/user.reducer';

export interface State {
    user: UserState;
}
