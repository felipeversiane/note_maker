import MainLayout from '../layouts/MainLayout';
import { useState } from 'react';
import NoteGrid from '../components/Grids/NoteGrid';
import CreateModal from '../components/Modals/CreateModal';
import SignupModal from '../components/Modals/SignupModal';


const Index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(true);
  const [notas, setNotas] = useState([]);
  const[creator,setCreator] = useState(0);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const createNote = async () =>{
    const noteData = {
     "title":"",
     "content":"",
     "creator":creator
    }
    fetch('http://localhost:8000/api/myapp/note/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(noteData),
        }).then((postResponse) => {
            if (postResponse.status === 201 || postResponse.status === 200) {
              postResponse.json().then((data) => {
              });
            }else {
              console.log('Erro ao criar nota:', postResponse.status);
            }
          })
          .catch((postError) => {
            console.error('Erro ao criar nota:', postError);
          });
  }

  const fetchNotesByCreator = async (id) => {
    const url = `http://localhost:8000/notes-by-creator/${id}/`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao obter as notas');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro:', error);
      return [];
    }
  };
  

  const toggleSignupModal = async (id) => {
    setShowSignupModal(!showSignupModal);
    setCreator(id);
    if(id){
      const notes = await fetchNotesByCreator(id);
      setNotas(notes);
    }
  };



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
