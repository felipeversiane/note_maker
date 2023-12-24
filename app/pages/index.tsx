import MainLayout from '../layouts/MainLayout';
import { useState } from 'react';
import NoteGrid from '../components/Grids/NoteGrid';
import CreateModal from '../components/Modals/CreateModal';
import SignupModal from '../components/Modals/SignupModal';


const Index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(true);


  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleSignupModal = (id) => {
    setShowSignupModal(!showSignupModal);
    if(id){
      
    }
  };

  const notas = []; 

  return (
    <MainLayout title='NoteMaker'>
      <SignupModal showSignupModal={showSignupModal} toggleSignupModal={toggleSignupModal} />
      <div className="w-screen h-screen flex justify-start items-start flex-col px-[10rem] py-[2rem]">
        <div className="text-3xl font-semibold mb-10 h-[5%] ml-5"><h1>Notas</h1></div>
        <NoteGrid notas={notas} />
        <div className="bg-transparent w-full flex justify-end items-end h-[10%] mt-10">
          <button className="w-16 h-16 bg-black hover:bg-gray-700 hover:shadow-lg transition-all duration-300 rounded-full flex items-center justify-center text-white text-3xl shadow-md focus:outline-none"
            onClick={toggleCreateModal}>
            +
          </button>
        </div>
        <CreateModal
          showCreateModal={showCreateModal}
          toggleCreateModal={toggleCreateModal}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
