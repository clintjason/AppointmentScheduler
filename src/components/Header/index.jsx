const Header = ({borderRadius, maxWidth, width}) => {

  const Style = {
      borderRadius: borderRadius,
      maxWidth: maxWidth,
      width: width
  }
  return (
    <header style={{borderRadius: borderRadius}}>
      <div className='header__title' style={{maxWidth: maxWidth, width: width}}>DrNG | PATIENTS</div>
    </header>
  )
}


export default Header;