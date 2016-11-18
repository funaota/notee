import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default class TrashTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {contents: []};

        this.setContent = this.setContent.bind(this);
        this.updateTrash = this.updateTrash.bind(this);
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
                    <RaisedButton
                        onClick={this.updateTrash}
                        label="Restore"
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

    updateTrash(e){
        this.props.actions.update(this.props.content.id, this.props.model_name);
    }


}
