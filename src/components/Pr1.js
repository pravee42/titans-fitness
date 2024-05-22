import React from 'react';
import '../styles/pr.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// import '../styles/';

  
// const LoginForm = () => {
    const Preview1 = ({ user }) => {
        if (!user) {
            return <div>Loading...</div>; // or any other fallback UI
          }


    return (
        
        <div className="content h-100 mt-5">
            
            <form action="#">
                
                {/* <button className="button">Sign in</button> */}
                <div className="flex items-center bg-transparent gap-4 mb-5 justify-center">
                      <img src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"
                        class="relative inline-block object-cover object-center h-[58px] w-[58px] !rounded-full" />
                    <div className='bg-transparent justify-center item-center text-center' >
                        <h6 class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                          Tania Andrew
                        </h6>
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                          Web Developer
                        </p>
                    </div>
                </div>

    <div className="container h-100 bg-gray-200">
      <div className="icon h-6 border border-gray-400 rounded-full flex justify-center items-center">
        <FontAwesomeIcon icon={faPhone} className="bg-transparent text-gray-600 text-xl fa-fw fabg-transparent text-gray-600 text-xl fa-fw fa-inverse" />
      </div>
      <div className="inside text-center h-10 w-6">
        <h1 className='text-center mt-2'> {user.mobileNumber} </h1>
      </div>
    </div>

                    <div className="container h-9 mt-5">
                        <div className="icon h-6 border border-gray-400 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="bg-transparent text-gray-600 text-xl fa-fw fa-inverse" />
                        </div>
                        <div className="inside text-center h-10 w-6">
                        <h1 className='text-center mt-2'> {user.email}</h1>
                        </div>
                    </div>

                    <div className="container h-9 mt-5">
                        <div className="icon h-6 border border-gray-400 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="bg-transparent text-gray-600 text-xl fa-fw fa-inverse" />
                        </div>
                        <div className="inside text-center h-10 w-4">
                        <h1 className='text-center p-2 px-3 '> {user.dob} </h1>
                        </div>
                    </div>

                    <div className="container h-9 mt-5">
                        <div className="icon h-6 border border-gray-400 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="bg-transparent text-gray-600 text-xl fa-fw fa-inverse" />
                        </div>
                        <div className="inside text-left h-20 w-6 address">
                        <h1 className='text-center mt-2'> {user.address} </h1>
                        </div>
                    </div>
            </form>
            
        </div>
    );
};

export default Preview1;
