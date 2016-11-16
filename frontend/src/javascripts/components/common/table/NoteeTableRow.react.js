import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router';

// utils
import pluralize from 'pluralize';


export default class NoteeTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {contents: []};

        this.setContent = this.setContent.bind(this);
        this.deleteContent = this.deleteContent.bind(this);

    }

    componentDidMount() {
        this.setContent();
    }

    render() {
        return(
            <TableRow>
                {this.state.contents.map((content, index)=>{
                    return (
                        <TableRowColumn key={index}>{content}</TableRowColumn>
                    );
                })}
                <TableRowColumn>
                    <Link to={`/notee/${pluralize(this.props.modelName).toLowerCase()}/edit/${this.props.content.id}`} activeClassName="active">
                        <RaisedButton
                            label="edit"
                            primary={true} /></Link>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.deleteContent}
                        label="delete"
                        secondary={true}
                        disabled={false}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    setContent(){
        var arr = [];
        var tmp_contents = this.props.content;
        this.props.columns.map((column)=>{
            var content = "tmp_contents." + column;
            arr.push(eval(content));
        })

        this.setState({contents: arr});
    }

    deleteContent(e){
        this.props.actions.delete(this.props.content.id);
    }
}