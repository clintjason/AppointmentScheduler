const Header = ({borderRadius, width}) => {
  
  const Style = {
      borderRadius: borderRadius,
      width: width
  }
  return (
    <header style={Style}>
      <div className='header__title'>DrNG | PATIENTS</div>
    </header>
  )
}


export default Header;