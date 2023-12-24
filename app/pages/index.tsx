import MainLayout from '../layouts/MainLayout';
import { useEffect, useState } from 'react';
import NoteGrid from '../components/Grids/NoteGrid';
import CreateModal from '../components/Modals/CreateModal';
import SignupModal from '../components/Modals/SignupModal';


const Index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(true);
  const [notas, setNotas] = useState([]);
  const [creator,setCreator] = useState(0);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const togglePutModal = async (note) => {
    const newNote ={title:note.title,content:note.content,creator:creator}
    try {
      const response = await fetch('http://localhost:8000/api/myapp/note/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
  
      if (response.ok) {
        setShowCreateModal(!showCreateModal);
        await fetchNotesByCreator();
      } else {
        console.log('Erro ao criar nota:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      return null;
    }
  }

  
  const fetchNotesByCreator = async () => {
    const url = `http://localhost:8000/notes-by-creator/${creator}/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao obter as notas');
      }
      const data = await response.json();
      setNotas(data);
     } catch (error) {
      console.error('Erro:', error);
      return [];
    }
  };
  

  const toggleSignupModal = async (id:number) => {
    setCreator(id);
    setShowSignupModal(!showSignupModal);
  };

  useEffect(() => {
    if (creator !== 0 && !showSignupModal) {
      fetchNotesByCreator();
    }
  }, [creator, showSignupModal]);

  return (
    <MainLayout title='NoteMaker'>
      <SignupModal showSignupModal={showSignupModal} toggleSignupModal={toggleSignupModal} />
      <div className="w-screen h-screen flex justify-start items-start flex-col px-[10rem] py-[2rem]">
        <div className="text-3xl font-semibold mb-10 h-[5%] ml-5"><h1>Notas</h1></div>
        <NoteGrid notas={notas} fetchNotesByCreator={fetchNotesByCreator}/>
        <div className="bg-transparent w-full flex justify-end items-end h-[10%] mt-10">
          <button className="w-16 h-16 bg-black hover:bg-gray-700 hover:shadow-lg transition-all duration-300 rounded-full flex items-center justify-center text-white text-3xl shadow-md focus:outline-none"
            onClick={toggleCreateModal}>
            +
          </button>
        </div>
        <CreateModal
          showCreateModal={showCreateModal}
          togglePutModal={togglePutModal}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
