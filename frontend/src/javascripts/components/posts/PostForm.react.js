import React, {Component, PropTypes} from 'react';

// stores
import ImageStore from '../../stores/ImageStore';

// components
import PostImage  from './PostImage.react.js';
import PostNewCategory  from './PostNewCategory.react.js';

export default class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_saving: false,
            display_image: false,
            display_mode: "",
            thumbnail_src: "default.png"
        };

        this.pushImage = this.pushImage.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.insertThumbnail = this.insertThumbnail.bind(this);
        this.setThumbnail = this.setThumbnail.bind(this);
    }

    componentWillReceiveProps(){
        ImageStore.loadImage(this.props.content.thumbnail_id, this.setThumbnail);
    }

    render() {

        var style = {
            layout: {
                half: {
                    width: "48%",
                    maxWidth: "48%",
                    marginRight: "1%",
                    marginLeft: "1%",
                    float: "left"
                }
            },
            form: {
                main_area: {
                    width: "100%",
                    height: "300px",
                    marginBottom: "10px"
                },
                input_text: {
                    width: "100%",
                    height: "30px",
                    marginBottom: "10px"
                },
                select: {
                    width: "100%",
                    height: "30px",
                    marginBottom: "10px"
                },
                textarea: {
                    width: "100%",
                    height: "80px",
                    marginBottom: "10px"
                },
                button: {
                    width: "100%",
                    height: "50px",
                    marginBottom: "10px"
                },
                image_button: {
                    width: "30%",
                    height: "50px",
                    marginBottom: "10px"
                }
                ,
                thumbnail: {
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px"
                }
            }
        }

        var statuses = [];
        for (var key in this.props.statuses) {
            statuses.push(
                <option key={this.props.statuses[key]} value={this.props.statuses[key]}>
                    {key}
                </option>
            );
        }

        var categories = this.props.categories.map(function(category) {
            return <option key={category.id} value={category.id}>{category.name}</option>;
        });

        var handleChange = this.props.handleChange;

        return (
            <div style={style.layout.half}>
                {(() => {
                    if (this.state.display_image) {
                        return (
                            <PostImage
                                insertImage={this.insertImage}
                                insertThumbnail={this.insertThumbnail}
                                pushImage={this.pushImage}
                                mode={this.state.display_mode}
                            />
                        );
                    }
                })()}

                <div style={{float: "left", width: "100%"}}>
                    <p>Title:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.props.content.title}
                        onChange={function(e){handleChange(e, "title")}}
                    />
                    <p>Content:</p>
                    <button
                        style={style.form.image_button}
                        onClick={this.pushImage.bind(this, "image")}>image</button>
                    <textarea
                        id="main_area"
                        style={style.form.main_area}
                        type="textarea"
                        value={this.props.content.content}
                        onChange={function(e){handleChange(e, "content")}}
                    />
                    <p>slug:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.props.content.slug}
                        onChange={function(e){handleChange(e, "slug")}}
                    />
                    <p>status:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.props.content.status}
                        onChange={function(e){handleChange(e, "status")}}>

                        {statuses}

                    </select>
                    {(() => {
                        if (this.props.content.status == 2000) {
                            return (
                                <div>
                                    <p>secret_published_password:</p>
                                    <input
                                        style={style.form.input_text}
                                        type="text"
                                        value={this.props.content.secret_published_password}
                                        onChange={function(e){handleChange(e, "secret_published_password")}}
                                    />
                                </div>
                            );
                        }
                    })()}

                    <p>category:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.props.content.category_id}
                        onChange={function(e){handleChange(e, "category_id")}}>
                        {categories}
                    </select>

                    <PostNewCategory
                        categories={this.props.categories}
                    />
                    <p>thumbnail:</p>
                    <button
                        style={style.form.image_button}
                        onClick={this.pushImage.bind(this, "thumbnail")}>image</button>
                    <img
                        style={style.form.thumbnail}
                        alt="thumbnail"
                        src={window.location.origin + "/notee/" + this.state.thumbnail_src}
                    />
                    <input
                        style={style.form.input_text}
                        type="hidden"
                        id="thumbnail_id"
                        value={this.props.content.thumbnail_id}
                        onChange={function(e){handleChange(e, "thumbnail_id")}}
                    />
                    <p>seo_keyword:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.props.content.seo_keyword}
                        onChange={function(e){handleChange(e, "seo_keyword")}}
                    />
                    <p>seo_description:</p>
                    <textarea
                        style={style.form.textarea}
                        type="textarea"
                        value={this.props.content.seo_description}
                        onChange={function(e){handleChange(e, "seo_description")}}
                    />
                    <button
                        style={style.form.button}
                        onClick={this.props.saveContent}>Submit</button>
                </div>
            </div>
        );
    }
    
    pushImage(name){
        switch (this.state.display_image){
            case true:
                this.setState({display_image: false});
                break;
            case false:
                this.setState({display_image: true});
                break;
        }

        console.log(name);

        this.setState({display_mode: name});
    }

    insertImage(image){
        var image_txt = "![](" + image + ")";
        var mainArea = document.getElementById('main_area');
        var leftPart = mainArea.value.substr(0, mainArea.selectionStart);
        var rightPart = mainArea.value.substr(mainArea.selectionStart, mainArea.value.length);
        mainArea.value = leftPart + image_txt + rightPart;
        this.props.content.content = mainArea.value;
        this.setState({display_image: false});
        this.props.handleChange();
    }

    insertThumbnail(thumbnail){
        this.props.content.thumbnail_id = thumbnail.id;
        this.setState({display_image: false});
        this.props.handleChange();
    }

    setThumbnail(thumbnail){
        if(thumbnail){
            this.setState({thumbnail_src: thumbnail.content});
        }
    }
};

