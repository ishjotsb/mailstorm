import { useSearchParams } from "react-router-dom"

export default function Home() {

    const [searchParams] = useSearchParams();
    const access_token = searchParams.get('access_token');
    console.log(access_token)

  return (
    <div>{access_token}!</div>
  )
}
