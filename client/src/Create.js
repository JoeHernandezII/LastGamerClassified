import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });
    // destructure values from state
    const { title, content, user } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', content: '', user: '' });
                // show sucess alert
                alert(`Post titled ${response.data.title} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>Add Your Gamer Tag</h1>
            <br />

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
                    <label className="text-muted">What brings you to us?</label>
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
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
