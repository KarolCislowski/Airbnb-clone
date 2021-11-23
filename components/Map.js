import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'

export const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({})

  const coordinates = searchResults.map(e => ({ latitude: e.lat, longitude: e.long }))

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 12
  })
  return (
    <ReactMapGL
      mapStyle='mapbox://styles/cislowskikarol/ckvtqfhlv29h814p8yd4phuhw'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(e) => setViewport(e)}
    >
      {searchResults.map(result => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
            >📌</p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >{result.title}</Popup>
          ) : false}
        </div>
      ))}
    </ReactMapGL>
  )
}