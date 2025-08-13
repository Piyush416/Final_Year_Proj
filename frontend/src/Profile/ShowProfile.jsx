import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BasicDetails from './SubComponents/BasicDetails'
import ProfileSections from './SubComponents/ProfileSections'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../Contexts/ProgressContext.jsx'
import { createAxiosInstance } from '../axios/axiosInstance.js'

export default function ShowProfile() {
  const [profileData, setProfileData] = useState({}) // Start as null
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const { showProgress, hideProgress } = useProgress();
  const axiosInstance = createAxiosInstance(showProgress, hideProgress);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get('/api/profile') // Adjust endpoint as needed
        console.log('Profile Data:', response.data)
        toast.success('Profile data fetched successfully!')
        setProfileData(response.data.data || {}) // Prevent undefined
      } catch (error) {
        toast.error('Failed to fetch profile data. Please try again later.')
        console.error('Error fetching profile data:', error)
        setProfileData({})
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    )
  }

  const handleEditDetails = () => {
    // Navigate to edit profile page
    navigate(`/edit-profile/${profileData.userProfile._id}`)
  }


  // If no profile data
  if (!profileData || Object.keys(profileData).length === 0) {
    return (
      <div className="p-6 space-y-6 bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            No profile data found
          </h2>
          <p className="text-gray-500">Please create your profile first.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Render BasicDetails only when userProfile exists */}
      {profileData?.userProfile && <BasicDetails profileData={profileData} />}

      {/* Render ProfileSections if profile exists */}
      {profileData?.profile ? (
        <ProfileSections profileData={profileData} />
      ) : (
        <div className="p-6 space-y-6 bg-gray-100">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex flex-row">
              Profile Sections <Edit className="ml-2" onClick={() => handleEditDetails()} />
            </h2>
            <p className="text-gray-500">
              No additional profile sections available. Please edit the profile
              section.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
