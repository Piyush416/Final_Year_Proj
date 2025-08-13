import React from 'react'
import logo from '../assets/undraw_graduation.svg'
import { useProgress } from '../Contexts/ProgressContext.jsx'
import { createAxiosInstance } from '../axios/axiosInstance';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


const Faculty = [
    {
        "facultyName": "Faculty of Engineering and Technology",
        "college": [
            "Parul Institue of Engineering and Technology",
            "Parul Institue of Technology"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Diploma Studies",
        "college": [
            "Parul Institue of Engineering and Technology(DS)",
            "Parul Polytechnic Institue"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Management",
        "college": [
            "Parul Institute of Management & Research - PIMR",
            "Parul Institute of Engineering & Technology - MBA - PIET - MBA",
            "Parul Institute of Management (PGDM) - PIM - PGDM",
            "Parul Institute of Business Administration - PIBA"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of IT & Computer Science",
        "college": [
            "Parul Institue of Computer Application-PICA",
            "Parul Institue of Engineering & Technology-MCA - PIET-MCA"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Pharmacy",
        "college": [
            "Parul Institue of Pharmacy - PIP",
            "Parul Institue of Pharmacy and Research - PIPR",
            "School of Pharmacy - SOP"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Homeopethy",
        "college": [
            "Jawaharlal Nehru Homoeopathic Medical College - JNHMC",
            "Rajkot Homoeopathic Medical College - RHMC",
            "Ahmedabad Homoeopathic Medical College - AHMC",
            "Parul Institute of Homoeopathic & Research - PIHR"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Medicine & Faculty of Nursing",
        "college": [
            "Parul Institute of Public Health - PIPH",
            "Department of Paramedical and Health Sciences - DPMHS",
            "Parul Institute of Medical Science & Research - PIMSR",
            "Parul Institute of Nursing - PIN"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Physiotherapy",
        "college": [
            "Parul Institue of Physiotherapy - PIPT",
            "Ahmedabad Physiotherapy College - APC",
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Architecture and Planning",
        "college": [
            "Parul Institue of Architecture & Research - PIAR",
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Ayurved and Planning",
        "college": [
            "Parul Institue of Ayurved - PIA",
            "Parul Institue of Ayurved & Research - PIA Research"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Law",
        "college": [
            "Parul Institue of Law - PIL",
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Social Work",
        "college": [
            "Parul Institue of Social Work - PISW",
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Commerce",
        "college": [
            "Parul Institue of Commerce - PIC",
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Design & Faculy of Fine Arts & Faculty of Arts",
        "college": [
            "Parul Institue of Design - PID",
            "Parul Institue of Fine Arts - PIFA",
            "Parul Institue of Arts - PIArts"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Agriculture",
        "college": [
            "College of Agriculture - COA"
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Hotel Management & Catering Technology",
        "college": [
            "Parul Institue of Hotel Management and Catering Technology - PIHMCT",
        ],
        "backgroundColor": getRandomColor()
    },
    {
        "facultyName": "Faculty of Library and Information Science",
        "college": [
            "Parul Institue of Library and Information Science - PILIS",
        ],
        "backgroundColor": getRandomColor()
    },

]


const Landing = () => {
    const navigate = useNavigate()
    const { showProgress, hideProgress } = useProgress();
    const axiosInstance = createAxiosInstance(showProgress, hideProgress);
    //showProgress()
    // axiosInstance.get('/api/t')
    


    return (
        <div className='bg-black w-full min-h-screen' style={{ backgroundColor: 'whitesmoke' }}>
            <div className='flex flex-col justify-around items-end'>
                <div>
                    
                </div>
                <div className='mt-2'>
                <Button className="space-x-1 mr-2 px-5 py-6 gap-5 cursor-pointer hover:bg-blue-400" variant="link" onClick={() => navigate('/login')}>
                    Login
                </Button>
                <Button className="space-x-1.5 px-5 py-6 gap-5 cursor-pointer hover:bg-blue-400" variant="link" onClick={() => navigate('/register')}>
                    Registration
                </Button>
                </div>
            </div>
            {/* About Parul University */}
            <div className='flex flex-col justify-center items-center p-10'>
                <p>Parul University Alumni Portal</p>
                <p>Stay Connected,network, and grow with our alumni community</p>
                <p>Engage in Discussion Forums,find Peers via Find Alumni,explore</p>
                <p>Oppurtunities, and join our Mentorship program. Stay Updated on Events</p>
                <p>Communicate via Inbox, and celebrate our legacy in the </p>
                <p>About Section</p>
                <img src={logo}></img>
            </div>

            <div className='flex flex-col justify-center items-center w-full'>
                <div className='bg-amber-500 w-1/2 p-4 rounded-full flex justify-center'><p className='text-3xl font-bold'>Faculty</p></div>

            </div>
            <div className='bg-gray-100 rounded-3xl p-4 mt-2 grid sm:grid-cols-2 lg:grid-cols-4 m-8 space-x-2' >
                {Faculty.map((index) => (
                    <>
                        <div className='rounded-2xl ' >

                            <div className='px-4 py-4 m-2 rounded-3xl bg-gray-200 flex flex-col min-h-[250px]' style={{ backgroundColor: `${index.backgroundColor}` }}>
                                <p className='p-2 text-center text-xl font-bold underline tracking-wider'>{index.facultyName}</p>
                                {index.college.map((item) => (
                                    <li className=' p-2 text-md'>{item}</li>
                                ))}
                            </div>
                        </div>
                    </>
                )
                )}
            </div>
        </div>
    )
}

export default Landing
