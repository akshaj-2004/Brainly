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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-2xl shadow">
          <div className="text-2xl font-bold text-gray-800">
            Brainly
          </div>
          <div className="flex gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              text="Add Content" 
              startIcon={<PlusIcon size="md" />} 
              onClick={() => SetOpenModel(true)} 
            />
            <Button 
              variant="secondary" 
              size="lg" 
              text="Share Brain" 
              startIcon={<ShareIcon size="md" />} 
              onClick={() => {}} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-4">
          
          {/* Sidebar */}
          <div className="w-64">
            <Sidebar />
          </div>

          {/* Cards + Modal */}
          <div className="flex-1">
            <ContentModel 
              open={openModel} 
              onClose={() => SetOpenModel(false)} 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <Card 
                  key={index}
                  title="Ideas"
                  link="https://www.youtube.com/embed/nq82V5OpapE?si=NoLcrEH-55UuZm21"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
