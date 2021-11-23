import { ReactSmartScroller } from 'react-smart-scroller'

const Gallery = ({ heading, data }) => {
  return (
    <div className='mx-4'>
      <div className='text-3xl'>
        <h3>{heading}</h3>
      </div>
      <ReactSmartScroller spacing={24} draggable>
        {data?.map((item) => {
          const { id, name, images } = item
          return (
            <div className='slide' key={id}>
              <div className=''>
                <img src={images[1].url} alt={name} />
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
