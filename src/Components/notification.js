import React from 'react'
import Header from './Header'

const Notification = () => {
  return (
    <div>
      <Header />
      <div className='retailers-content prof profile-top'>
        <div className='retailers-list'>
            <h3>Notifications</h3>
            <hr></hr>
            <div>
            <div className='bid-details profile-cont'>
            <span>TATA STEEL offers you a bid</span>
            <h3>Bid details:</h3>
            <span>Bid amount:</span>
            <span>Work details:</span>
            </div>
            </div>
        </div>
    </div>
      </div>
  )
}

export default Notification