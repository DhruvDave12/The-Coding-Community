import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const TellUsMoreForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [education, setEducation] = useState('');
    const [country, setCountry] = useState('');
    const [codeChefRating, setCodeChef] = useState('');
    const [codeForcesRating, setCodeForcesRating] = useState('');
    const [github, setGithub] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [aboutYou, setAboutYou] = useState('');
    const [skillSt, setSkillSt] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const skills = skillSt.split(', ');
        await axios.post('https://the-coding-community.herokuapp.com/tell-us-more', {
                firstName: firstName,
                lastName: lastName,
                education,
                country,
                codeChefRating,
                codeforcesRating: codeForcesRating,
                github,
                linkedInUrl: linkedIn,
                bio: aboutYou,
                skills: skills
            },
            {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            });

        navigate('/profile');
        window.location.reload(false);
    }
    return (
        <div className="tell-us-more">
            <form onSubmit={handleSubmit}>
                <div className="fields">
                    <div className="field1">
                        <label htmlFor="fname" className="lab">First Name</label>
                        <input type="text" id="fname" onChange={e => setFirstName(e.target.value)} placeholder="First Name"/>
                    </div>
                    <div className="field2">
                        <label htmlFor="lname" className="lab">Last Name</label>
                        <input type="text" id="lname" onChange={e => setLastName(e.target.value)} placeholder="Last Name"/>
                    </div>
                </div>
                <div className="fields">
                    <label htmlFor="edu" className="lab">Education</label>
                    <input type="text" id="edu" onChange={e => setEducation(e.target.value)} placeholder="Education"/>
                </div>

                <div className="fields">
                    <label htmlFor="cont" className="lab">Country</label>
                    <input type="text" id="cont" onChange={e => setCountry(e.target.value)} placeholder="Country"/>
                </div>

                <div className="fields">
                    <label htmlFor="cc" className="lab">Codechef Rating</label>
                    <input type="text" id="cc" onChange={e => setCodeChef(e.target.value)} placeholder="Codechef Rating"/>
                </div>
                <div className="fields">
                    <label htmlFor="cf" className="lab">Codeforces Rating</label>
                    <input type="text" id="cf" onChange={e => setCodeForcesRating(e.target.value)} placeholder="Codeforces Rating"/>
                </div>
                <div className="fields">
                    <label htmlFor="git" className="lab">Github Username</label>
                    <input type="text" id="git" onChange={e => setGithub(e.target.value)} placeholder="Github Username"/>
                </div>
                <div className="fields">
                    <label htmlFor="linked" className="lab">LinkedIn URL</label>
                    <input type="text" id="linked" onChange={e => setLinkedIn(e.target.value)} placeholder="LinkedIn URL"/>
                </div>
                <div className="fields">
                    <label htmlFor="bio" className="lab">About You</label>
                    <input type="text" id="bio" onChange = {e => setAboutYou(e.target.value)} placeholder="About You"/>
                </div>
                <div className="fields">
                    <label htmlFor="skills" className="lab">Skills (Eg. Developer, Data Structures)</label>
                    <input type="text" id="skills" onChange = {e => setSkillSt(e.target.value)} placeholder="Skills"/>
                </div>


                <button>Submit</button>
            </form>
        </div>
    )
}

export default TellUsMoreForm;