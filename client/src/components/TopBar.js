import { Link } from 'react-router-dom'

export default function TopBar() {

  const hundleBar = () => {
    if(document.getElementsByClassName('side-bar')[0].style.width === '320px'){
      document.getElementsByClassName('side-bar')[0].style.width='0px';
      document.getElementsByClassName('side-bar')[0].style.padding='0px';
    }else {
      document.getElementsByClassName('side-bar')[0].style.width='320px';
      document.getElementsByClassName('side-bar')[0].style.padding='20px';
    }
  };

  return (
    <div className='topBar shadow'>
      <div>
        <i className="fa-solid fa-bars" onClick={hundleBar}></i>
        <h1>Dashboard</h1>
      </div>
      <Link to='/' className='register-nav'>
        Go To Web Site
      </Link>
    </div>
  )
}
