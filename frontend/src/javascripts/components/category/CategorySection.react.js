import React, {Component, PropTypes} from 'react';

// notee
import CategoryStore from '../../stores/CategoryStore';
import CategoryActions from '../../actions/CategoryActions';
import Constants from '../../constants/NoteeConstants';

// material-ui
import { Link } from "react-router";
import CategoryForm from './CategoryForm.react';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';


export default class CategorySection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.changeSuccessed = this.changeSuccessed.bind(this);

    }

    componentDidMount() {
        CategoryStore.addChangeListener(Constants.CATEGORY_CREATE, this.changeSuccessed);
        CategoryStore.addChangeListener(Constants.CATEGORY_UPDATE, this.changeSuccessed);
        CategoryStore.addChangeListener(Constants.CATEGORY_DELETE, this.changeSuccessed);
    }

    componentWillMount() {
        CategoryStore.loadCategories(this.ajaxLoaded);
    }

    ajaxLoaded(content){
        this.setState({categories: content});
    }

    render() {
        return (
            <div class="main">
                <CategoryForm
                    categories={this.state.categories}
                />

                <NoteeTable
                    modelName="Category"
                    columns={['id', 'name', 'slug', 'parent_id', 'is_private']}
                    contents={this.state.categories}
                    store={CategoryStore}
                    actions={CategoryActions}
                />
            </div>
        );
    }

    changeSuccessed(){
        CategoryStore.loadCategories(this.ajaxLoaded);
    }
    
};
