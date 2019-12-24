import React from 'react'
import config from 'config'

function Movie({ name, genre, director, poster, trailer }) {
    return (
        <div className='col-3'>
            <div className="mb-2"
                style={{
                    'position': 'relative',
                    'height': '365px',
                    'width': '100%'
                }}
            >
                <img src={config.apiAssets + poster} style={{ 'width': '100%', 'height': '100%' }}/>
            </div>
            <div>
                <h6>{name}</h6>
                <div><b>Thể loại:</b> {genre}</div>
                <div><b>Đạo diễn:</b> {director}</div>
                <div className="d-flex justify-content-center mt-2">
                    <a target="blank" href={trailer} className="btn btn-primary mr-2 flex-fill">Trailer</a>
                    <a href={"Sellticket?name="+name} className="btn btn-success flex-fill">Buy Ticket</a>
                </div>
            </div>
            <br/>
        </div>
    )
}

export default Movie
