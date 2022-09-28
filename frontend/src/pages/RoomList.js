import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRooms } from '../services/rooms'
import Loader from '../components/Loader'
import Message from '../components/Message'
import RoomListSortings from '../components/RoomListSortings'
import useAsync from '../hooks/useAsync'

// const sortingCriterias = ["name", "property_type", "amenity", "price"];

const RoomList = ({ match }) => {
  const page = match.params.pageNumber || 1
  const [amenities, setAmenities] = useState([])
  const [propertyTypes, setPropertyTypes] = useState([])
  const [keywordType, setKeywordType] = useState('name')
  const [keyword, setKeyword] = useState(match.params.keyword)
  const { loading, error, data } = useAsync(() => getRooms(keywordType, keyword, page), [keywordType, keyword, page])

  useEffect(() => {
    getFilters()
  }, [])

  const getFilters = async () => {
    try {
      const { data } = await getRooms()
      setPropertyTypes(getPropertyTypes(data))
      setAmenities(getAmenities(data))
    } catch (error) {
      console.log(error)
    }
  }

  const getPropertyTypes = (data) => [...new Set(data.rooms.map((room) => room.property_type))]

  const getAmenities = (data) => {
    return data.rooms
      .map((room) => room.amenities)
      .reduce((acc, curr) => {
        curr.forEach((x) => {
          if (x.startsWith('translation missing')) return
          if (!acc.includes(x)) {
            acc.push(x)
          }
        })
        return acc
      }, [])
  }

  const handleChange = (e) => {
    setKeywordType(e.target.name)
    setKeyword(e.target.value)
  }

  return (
    <>
      <RoomListSortings propertyTypes={propertyTypes} amenities={amenities} handleChange={handleChange} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : data?.rooms.length === 0 ? (
        <Message>No rooms found</Message>
      ) : (
        <div className="room-list-wrapper">
          {data?.rooms.map((room) => (
            <div key={room._id} className="room-card">
              <Link to={`/rooms/${room._id}`}>
                <img src={room.images.picture_url} alt={room.name} className="room-card-image" />
              </Link>
              <Link to={`/rooms/${room._id}`}>
                <h3 className="room-card-title">{room.name}</h3>
              </Link>
              <p className="room-card-text">
                <strong>Price: ${room.price.$numberDecimal}</strong> for <strong>{room.minimum_nights}</strong> nights
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default RoomList
