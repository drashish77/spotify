import { ReactSmartScroller } from 'react-smart-scroller'

const Gallery = ({ heading, data }) => {
  return (
    <div className='mx-4'>
      <div className='text-3xl flex'>
        <h3>{heading}</h3>
        <div className=''>
          <hr />
        </div>
      </div>
      <ReactSmartScroller spacing={24} draggable>
        {data?.map((item) => {
          const { id, name, icons } = item
          const finalImage = icons[0]?.url
          return (
            <div className='slide' key={id}>
              <div className=''>
                <img src={finalImage} alt={name} className='w-50' />
                <p>{name}</p>
              </div>
            </div>
          )
        })}
      </ReactSmartScroller>
    </div>
  )
}

export default Gallery
