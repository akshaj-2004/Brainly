import '../App.css';
import { Button } from '../components/ui/button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/ui/Card';
import { ContentModel } from '../components/ui/ContentModel';
import { Sidebar } from '../components/ui/SideBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export function Dashboard() {
  const [openModel, setOpenModel] = useState(false);
  const [allData, setAllData] = useState<any[]>([]);
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [share, setShare] = useState(false);

  const fetchContent = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      });
      setAllData(data.data);
      setFilteredContent(data.data);
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleFilterContent = (type: string) => {
    if (type === "All") {
      setFilteredContent(allData);
    } else {
      const filtered = allData.filter(item => item.type.toLowerCase() === type.toLowerCase());
      setFilteredContent(filtered);
    }
  };

  const handleDelete = (id: string) => {
    setAllData(prev => prev.filter(item => item._id !== id));
    setFilteredContent(prev => prev.filter(item => item._id !== id));
  };

  const shareFun = async () => {
    setShare(true);
    try {
      const { data } = await axios.post<{ url: string }>(
        `${BACKEND_URL}/api/v1/brain/share`,
        {share},
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );
      await navigator.clipboard.writeText(data.url);
      alert("Share link copied to clipboard!");
    } catch (err) {
      console.error("Share failed:", err);
      alert("Unable to create share link. Please try again.");
    } finally {
      setShare(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar onFilter={handleFilterContent} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">All Notes</h1>
          <div className="flex gap-4">
            {/* <Button
              variant="secondary"
              size="lg"
              text={share ? "Sharing..." : "Share Brain"}
              startIcon={<ShareIcon size="md" />}
              onClick={share ? undefined : shareFun}
              disabled={share}
            /> */}
            <Button
              variant="primary"
              size="lg"
              text="Add Content"
              startIcon={<PlusIcon size="md" />}
              onClick={() => setOpenModel(true)}
            />
          </div>
        </div>

        {/* Modal */}
        {openModel && (
          <ContentModel
            open={openModel}
            onClose={() => setOpenModel(false)}
            setReloadData={fetchContent}
          />
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              link={item.link}
              icon={item.type}
              tag={item.tags}
              contentId={item._id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
