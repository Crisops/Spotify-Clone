const Geeting = () => {
  const hours = new Date().getHours()
  let greeting = ''

  if (hours < 12) {
    greeting = 'Buenos días'
  } else if (hours < 18) {
    greeting = 'Buenas Tardes'
  } else {
    greeting = 'Buenas Noches'
  }

  return (

    <h1 className='text-2xl font-bold'>{greeting}</h1>

  )
}

export default Geeting
