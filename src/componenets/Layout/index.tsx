import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "../../types";
interface Layout{
    notes:Note[];
}

const Layout = ({notes}:Layout) => {
//1urlden id al
const {id}=useParams()
//2 urlden alınan id ile eşleşen notu bul
const found=notes.find((n)=>n.id==id)
//3 note bulunamadıysa kullanıcıyı anasayfaya yönlendir
if (!found) return <Navigate to={"/"} replace/>

//4 alt routu ekrna bas 
  return <Outlet context={found}/>
}

export default Layout
