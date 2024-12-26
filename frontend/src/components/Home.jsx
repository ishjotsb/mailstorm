import { useSearchParams } from "react-router-dom"

export default function Home() {

    const [searchParams] = useSearchParams();
    const access_token = searchParams.get('access_token');
    console.log(access_token)

  return (
    <div className="main-container">
        <h2>Mail Storm</h2>
        <div className="form-container">
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
    </div>
    </div>
  )
}
