import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h1> HOME</h1><br />
      <Link to="/addstudent"><PersonAddIcon /> ADD STUDENT</Link><br/>
      <Link to="/usermanagement"><InfoIcon />USER MANAGEMENT</Link><br/>
      <Link to="/login"><LogoutIcon />Logout</Link>
    </div>
  );
}

export default Sidebar;
