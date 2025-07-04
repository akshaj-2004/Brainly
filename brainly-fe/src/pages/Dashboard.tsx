import '../App.css'
import { Button } from '../components/ui/button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/ui/Card'
import { ContentModel } from '../components/ui/ContentModel'
import { Sidebar } from '../components/ui/SideBar'
import { useState } from 'react'

export function Dashboard() {
  const [openModel, SetOpenModel] = useState(false)

  return (
    <div className="min-h-screen bg-gray100 flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">All Notes</h1>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              size="lg"
              text="Share Brain"
              startIcon={<ShareIcon size="md" />}
              onClick={() => {}}
            />
            <Button
              variant="primary"
              size="lg"
              text="Add Content"
              startIcon={<PlusIcon size="md" />}
              onClick={() => SetOpenModel(true)}
            />
          </div>
        </div>

        {/* Modal */}
        <ContentModel
          open={openModel}
          onClose={() => SetOpenModel(false)}
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card
              key={index}
              title="Future Projects"
              link="https://www.youtube.com/embed/nq82V5OpapE?si=NoLcrEH-55UuZm21"
              
            />
          ))}
        </div>
      </div>
    </div>
  )
}



