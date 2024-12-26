import { useSearchParams } from "react-router-dom"
import AuthIllustration from '../assets/auth-illustration.svg';
import AuthIllustration2 from '../assets/auth2.svg';

export default function Home() {

    const [searchParams] = useSearchParams();
    const access_token = searchParams.get('access_token');
    console.log(access_token)

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
                <input type="email" required  />
            </div>
            <div className="input-container">
                <label>Subject:</label>
                <input type="text" required  />
            </div>
            <div className="input-container">
                <label>Body:</label>
                <input type="text" required  />
            </div>
            <div className="input-container">
                <button>Send Email</button>
            </div>
        </div>
    </div>
  )
}
