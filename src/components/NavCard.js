const NavCard = ({ icon, name }) => {
  return (
    <div className='flex justify-between mx-4 items-center'>
      <i className={`fas fa-${icon}`}></i>
      <h3>{name}</h3>
    </div>
  )
}

export default NavCard
