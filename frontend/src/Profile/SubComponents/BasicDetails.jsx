import React, { useState } from 'react'
import { Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BasicDetails({profileData}) {


   return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* Basic Details Card */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex flex-row space-y-2">Basic Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-medium">First Name</span>
            <input
              readOnly
              type="text"
              name="name"
              value={profileData.userProfile.FirstName}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Last Name</span>
            <input
              readOnly
              type="email"
              name="email"
              value={profileData.userProfile.LastName}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Enrollment Number</span>
            <input
                readOnly
              type="text"
              name="phone"
              value={profileData.userProfile.EnrollmentNumber}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>

           <label className="block">
            <span className="font-medium">Mobile Number</span>
            <input
                readOnly
              type="text"
              name="phone"
              value={profileData.userProfile.mobileNumber}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Primary Email</span>
            <input
                readOnly
              type="text"
              name="phone"
              value={profileData.userProfile.primaryEmail}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Secondary Email</span>
            <input
                readOnly
              type="text"
              name="phone"
              value={profileData.userProfile.secondaryEmail}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Email Verified</span>
            <input
                readOnly
              type="text"
              name="phone"
              value={profileData.userProfile.emailVerified ? "Yes" : "No"}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Passing Year</span>
            <input
                readOnly
              type="text"
              name="phone"
              value={profileData.userProfile.passingYear}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
