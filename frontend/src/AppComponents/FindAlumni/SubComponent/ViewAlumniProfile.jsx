import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { useProgress } from '../../../Contexts/ProgressContext'
import { createAxiosInstance } from '../../../axios/axiosInstance'

export default function ShowProfile() {
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const { showProgress, hideProgress } = useProgress()
  const axiosInstance = createAxiosInstance(showProgress, hideProgress)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get(`/api/profile/${id}`)
        console.log('Find Alumni Data:', response.data.data)
        toast.success('Profile data fetched successfully!')
        setProfileData(response.data.data || null)
      } catch (error) {
        toast.error('Failed to fetch profile data. Please try again later.')
        console.error('Error fetching profile data:', error)
        setProfileData(null)
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

  if (!profileData) {
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
    <div className="p-6 space-y-6 bg-gray-100">
    
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex flex-row">
          Profile Details 
        </h2>

        <div className="space-y-2">
          <p><strong>Name:</strong> {profileData?.profile?.FirstName} {profileData?.profile?.LastName}</p>
          <p><strong>Email:</strong> {profileData?.profile?.primaryEmail}</p>
          <p><strong>College:</strong> {profileData?.userProfile?.college}</p>
          <p><strong>Branch:</strong> {profileData?.userProfile?.branchName}</p>
          <p><strong>Passing Year:</strong> {profileData?.profile?.passingYear}</p>
          <p><strong>Location:</strong> {profileData?.userProfile?.location}</p>
          <p><strong>Bio:</strong> {profileData?.userProfile?.bio}</p>

          {/* Skills list */}
          {profileData?.userProfile?.skills?.length > 0 && (
            <p><strong>Skills:</strong> {profileData.userProfile.skills.join(', ')}</p>
          )}

          {/* Website / Social Links */}
          <div className="mt-4">
            <p><strong>Website:</strong> <a href={profileData?.userProfile?.website} target="_blank" rel="noreferrer" className="text-blue-500 underline">{profileData?.userProfile?.website}</a></p>
            <p><strong>LinkedIn:</strong> <a href={profileData?.userProfile?.socialLinks?.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 underline">{profileData?.userProfile?.socialLinks?.linkedin}</a></p>
            <p><strong>Twitter:</strong> <a href={profileData?.userProfile?.socialLinks?.twitter} target="_blank" rel="noreferrer" className="text-blue-500 underline">{profileData?.userProfile?.socialLinks?.twitter}</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
