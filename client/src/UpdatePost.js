import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const UpdatePost = props => {
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        user: ''
    });
    const { title, content, slug, user } = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                const { title, content, slug, user } = response.data;
                setState({ ...state, title, content, slug, user });
            })
            .catch(error => alert('Error loading single post'));
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, user })
            .then(response => {
                console.log(response);
                const { title, content, slug, user } = response.data;
                // empty state
                setState({ ...state, title, content, slug, user });
                // show sucess alert
                alert(`Post titled ${title} is updated`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Gaming Platform</label>
                <input
                    onChange={handleChange('title')}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Which game system are you playing on?"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">What brings you to Gamer Classifieds?</label>
                <textarea
                    onChange={handleChange('content')}
                    value={content}
                    type="text"
                    className="form-control"
                    placeholder="Looking to play a game, duo something, or join a clan?"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Gamer Tag</label>
                <input
                    onChange={handleChange('user')}
                    value={user}
                    type="text"
                    className="form-control"
                    placeholder="Input your Gamer Tag"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    );

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>Update Your Gamer Info</h1>
            {showUpdateForm()}
        </div>
    );
};

export default UpdatePost;
