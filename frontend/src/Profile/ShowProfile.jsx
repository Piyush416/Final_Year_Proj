import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BasicDetails from './SubComponents/BasicDetails'
import ProfileSections from './SubComponents/ProfileSections'
import axios from 'axios'
import { toast } from 'sonner'

export default function ShowProfile() {
  const [profileData, setProfileData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/profile') // Adjust endpoint as needed
        console.log("Profile Data:", response.data.data)
        toast.success("Profile data fetched successfully!")
        setProfileData(response.data.data)
      } catch (error) {
        toast.error("Failed to fetch profile data. Please try again later.")
        console.error("Error fetching profile data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <BasicDetails profileData={profileData} />
      {profileData.profile === null
        ? (
          <ProfileSections profileData={profileData} />
        ) : (
          <div className="p-6 space-y-6 bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex flex-row">
                Profile Sections <Edit className="ml-2" />
              </h2>
              <p className="text-gray-500">
                No additional profile sections available. Please edit the profile section.
              </p>
            </div>
          </div>
        )}
    </>
  )
}
