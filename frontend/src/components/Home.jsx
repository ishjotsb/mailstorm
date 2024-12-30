import { useSearchParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react";
import AuthIllustration from '../assets/auth-illustration.svg';
import AuthIllustration2 from '../assets/auth2.svg';
import UserContext from "../context/user-context";
import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill'

export default function Home() {

    const [emailList, setEmailList] = useState([]);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const { setAccessToken } = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get('access_token');

    useEffect(() => {
        if (access_token) {
            localStorage.setItem("accessToken", access_token);
            setAccessToken(access_token);
        }

        const storedToken = localStorage.getItem("accessToken");
        if (!storedToken) {
            window.location.href = "/authenticate";
        } else {
            setAccessToken(storedToken);
        }
    }, [access_token, setAccessToken]);

    function handleEmail (e) {
        setEmail(e.target.value)
    }

    function handleSubject (e) {
        setSubject(e.target.value);
    }

    function handleBody(e) {
        setBody(e.target.value);
    }

    function handleAdd() {
        setEmailList(prevState => [...prevState, email])
        setEmail("");
    }

    async function handleClickSend() {

        if(emailList.length == 0 || subject == "" || body == "") {
            alert("Please fill all the details");
            return;
        }

        const reqObj = {
            emailList,
            subject,
            body
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/email/send-email`, {
                method: 'POST',
                body: JSON.stringify(reqObj),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if(!response || !response.ok) {
                alert("Sorry there was some error!");
                return;
            }
            const data = await response.json();
            setSubject("");
            setBody("");
            setEmailList([]);
            alert("Email sent successfully!")
            console.log(data);
        }
        catch(err) {
            console.log(err);
        }

    }

    function handleEmailRemove(e) {
        console.log(e.target.id);
        const newEmailList = emailList.filter((email, index) => index != e.target.id);
        setEmailList(newEmailList);
    }

  return (
    <div className="parent-container">
        <div className='info-container'>
                <img src={AuthIllustration} className='img1'/>
                <img src={AuthIllustration2} className='img2'/>
        </div>
        <div className="form-container">
            <h2>Mail Storm</h2>
            <div className="input-container">
                <label>Email List:</label>
                <div className="email-add">
                    <input type="email" required value={email} onChange={(e) => handleEmail(e)} />
                    <button onClick={handleAdd}>Add</button>
                </div>
            </div>
            <div className="email-list">
                {emailList.length != 0 && emailList.map((email, index) => <p className="email-item" onClick={(e) => handleEmailRemove(e)} id={index} key={index}>{email} <span>x</span></p>)}
            </div>
            <div className="input-container">
                <label>Subject:</label>
                <input type="text" required value={subject} onChange={(e) => handleSubject(e)} />
            </div>
            <div className="input-container">
                <label>Body:</label>
                {/* <input type="text" required value={body} onChange={(e) => handleBody(e)} /> */}
                <ReactQuill theme="snow" value={body} onChange={setBody} className="custom-editor"/>
            </div>
            <div className="input-container">
                <button onClick={handleClickSend} className="button-send">Send Email</button>
            </div>
        </div>
    </div>
  )
}
