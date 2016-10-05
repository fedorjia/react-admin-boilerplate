import { Router, Route, IndexRedirect } from 'react-router';

import App from './views/App';
import Login from './views/Login';
import List from './views/List';
import MForm from './views/SimpleForm';
import Widgets from './views/Widgets';

export default (
	<Router>
		<Route path="/login" component={Login} />

		<Route path="/" component={ App }>
			{/*<IndexRedirect to="/list"/>*/}
			{<Route path="/list" component={ List }/>}
			{<Route path="/form" component={ MForm }/>}
			{<Route path="/widgets" component={ Widgets }/>}
		</Route>
	</Router>

);