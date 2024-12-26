import { useSearchParams } from "react-router-dom"
import { useState } from "react";
import AuthIllustration from '../assets/auth-illustration.svg';
import AuthIllustration2 from '../assets/auth2.svg';

export default function Home() {

    const [emailList, setEmailList] = useState([]);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const [searchParams] = useSearchParams();
    const access_token = searchParams.get('access_token');

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

        const reqObj = {
            emailList,
            subject,
            body
        }

        try {
            const response = await fetch('http://localhost:8888/email/send-email', {
                method: 'POST',
                body: JSON.stringify(reqObj),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            });
            if(!response || !response.ok) {
                alert("Sorry there was some error!");
                return;
            }
            const data = await response.json();
            setSubject("");
            setBody("");
            alert("Email sent successfully!")
            console.log(data);
        }
        catch(err) {
            console.log(err);
        }

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
                    <button onClick={handleAdd}>+</button>
                </div>
            </div>
            <div>
                {emailList.length != 0 && emailList.map((email, id) => <p key={id}>{email}</p>)}
            </div>
            <div className="input-container">
                <label>Subject:</label>
                <input type="text" required value={subject} onChange={(e) => handleSubject(e)} />
            </div>
            <div className="input-container">
                <label>Body:</label>
                <input type="text" required value={body} onChange={(e) => handleBody(e)} />
            </div>
            <div className="input-container">
                <button onClick={handleClickSend}>Send Email</button>
            </div>
        </div>
    </div>
  )
}
