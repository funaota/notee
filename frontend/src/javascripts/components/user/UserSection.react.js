import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// notee
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

export default class UserSection extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			snackbar_open: false,
			snackbar_txt: ""
		}

		this.ajaxLoaded = this.ajaxLoaded.bind(this);

		// snackbar
		this.displaySnackBar = this.displaySnackBar.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
	}

	componentWillMount() {
		UserStore.loadAllUsers(this.ajaxLoaded);
	}

	ajaxLoaded(contents) {
		this.setState({users: contents});
	}

	render() {
		return (
			<div id="list">
				<Link to={`/notee/users/new`} activeClassName="active">
					<RaisedButton label="NEW User!!" primary={true} />
				</Link>
				<NoteeTable
					modelName="User"
					columns={['name', 'email', 'role']}
					contents={this.state.users}
					store={UserStore}
					actions={UserActions}
					ajaxLoad={this.ajaxLoaded}
					displaySnackBar={this.displaySnackBar}
				/>
				<Snackbar
					open={this.state.snackbar_open}
					message={this.state.snackbar_txt}
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose}
					bodyStyle={{backgroundColor: "rgba(0,0,0,0.8)"}}
				/>
			</div>
		);
	}

	displaySnackBar(txt){
		this.setState({
			snackbar_open: true,
			snackbar_txt: txt
		});
	}

	handleRequestClose(){
		this.setState({
			snackbar_open: false
		});
	}
}
