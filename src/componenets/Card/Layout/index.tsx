import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../../types";

interface LayoutProps {
  notes: Note[];
}

const Layout = ({ notes }: LayoutProps) => {
  //1-url'den id al
  const { id } = useParams();
  //2-urlden alınan id ile eşleşen notu bul
  const found = notes.find((n) => n.id == id);
  //3-note bulunamadıysa kullanıcıyı ana sayfaya gönder
  if (!found) return <Navigate to={"/"} replace />;

  //4-alt routu ekrana bas bulunan notu alt route gönder
  return <Outlet context={found}/>;
};

export default Layout;
