import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-row bottom-0 justify-around bg-gray-200 w-full p-8'>
            <div>
                <p className='font-bold'>ALUMNI PORTAL</p>
                <p>Briding the Generation</p>
                <div>
                    <p>Contact US</p>
                    <p>Email:- parul@gmail.com</p>
                    <p>Phone No:- 9988776655</p>
                </div>
            </div>
            <div>
                <p>Features</p>
                <li>
                    Home
                </li>
                <li>
                    About
                </li>
                <li>
                    Mentorship
                </li>
                <li>
                    Discussion Forums
                </li>
                <li>
                    Opportunities
                </li>
                <li>
                    Network
                </li>
                <li>
                    Inbox
                </li>
                <li>
                    Terms and Condition
                </li>
            </div>
            <div>
                <p className='font-bold'>Social</p>
                <div className='flex flex-row space-x-2 mt-4'>
                    <p>DISCORD</p>
                    <p>TWITTER</p>
                    <p>INSTAGRAM</p>
                    <p>LINKEDIN</p>
                    <p>YOUTUBE</p>
                </div>
                
            </div>
    )
}

export default Footer
