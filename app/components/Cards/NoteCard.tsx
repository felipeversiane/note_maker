import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fetchNotesByCreator from "../../pages/index"
import EditModal from "../Modals/EditModal"

interface CardProps {
  id: number;
  title: string;
  content: string;
  creator:number;
  fetchNotesByCreator: () => void;
}

const NoteCard: React.FC<CardProps> = ({id,title,content,creator, fetchNotesByCreator}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


    const toggleModal = () => {
      setShowModal(!showModal);
    };
    const handleView = () => {
      toggleModal();
    };

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

    const toggleEditModal = () => {
      setShowEditModal(!showEditModal);
    };
  
    const handleEdit = (id:number) => {
      toggleMenu();
      toggleEditModal();

    };

    const updateNote = async (id: number, updatedNote: { title: string; content: string }) => {
      try {
        const response = await fetch(`http://localhost:8000/api/myapp/note/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });
    
        if (response.ok) {
          fetchNotesByCreator();
        } else {
          console.error('Falha ao atualizar a nota.');
        }
      } catch (error) {
        console.error('Ocorreu um erro ao tentar atualizar a nota:', error);
      }
    };
    
    const closeOutsideModal = (e) => {
      if (e.target.classList.contains('backdrop')) {
        toggleModal();
      }
      };
    const handleDelete = async (id:number) => {
      try {
        const response = await fetch(`http://localhost:8000/api/myapp/note/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          fetchNotesByCreator();
         } else {
          console.error('Falha ao deletar o card.');
        }
      } catch (error) {
        console.error('Ocorreu um erro ao tentar deletar o card:', error);
      }
      toggleMenu();
    };
  return (
    <>
     {showEditModal && (
        <EditModal
          showEditModal={showEditModal}
          toggleEditModal={toggleEditModal}
          note={{id:id,title:title,content:content,creator:creator}}
          updateNote={updateNote}
        />
      )}
     {showModal && (
         <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-transparent">
         <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-md bg-transparent bg-opacity-30 flex items-center justify-center backdrop" onClick={closeOutsideModal}>
           <div className="z-50 bg-white p-6 rounded-md overflow-y-auto w-[47rem] h-[35rem] shadow-xl">
             <h2 className="text-xl font-semibold mb-4">{title}:</h2>
             <hr className="my-4 border-t border-gray-400"/>
             <p className="text-gray-700">{content}</p>
           </div>
         </div>
       </div>
     )}
    <div className="max-w-xs rounded-xl overflow-hidden shadow-xl cursor-pointer w-[278px] h-[201px] z-0 hover:shadow-zinc-300 transition-all duration-300 "onClick={handleView}>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center z-0">
          <h3 className="font-semibold text-xl mb-2">{title}</h3>
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); toggleMenu(); }} className="focus:outline-none px-1 py-1">
              <Image
                src="/icons/menu-icon.svg"
                alt="menu-icon"
                width="25"
                height="25"
                className=" bg-inherit"
              />
              {showMenu && (
                <ul className="absolute right-0 mt-2 py-2 w-40 bg-white border rounded shadow-md z-10">
                  <li
                    onClick={(e) => { e.stopPropagation(); handleEdit(id); }}
                    className="px-4 py-2 mr-4 ml-4 rounded-lg hover:bg-gray-200 cursor-pointer flex justify-between"
                  >
                    <p className="flex items-center bg-inherit">Editar</p>
                    <Image
                      src="/icons/edit-icon.svg"
                      alt="menu-icon"
                      width="20"
                      height="20"
                      className=" bg-inherit"
                    />
                  </li>
                  <li
                    onClick={(e) => { e.stopPropagation(); handleDelete(id); }}
                    className="px-4 py-2 mr-4 ml-4 rounded-lg hover:bg-gray-200 cursor-pointer flex justify-between"
                  >
                    <p className="flex items-center bg-inherit">Excluir</p>
                    <Image
                      src="/icons/trash-icon.svg"
                      alt="menu-icon"
                      width="20"
                      height="20"
                      className="bg-inherit"
                    />
                  </li>
                </ul>
              )}
            </button>
          </div>
        </div>
        <p className="text-gray-700 text-base overflow-hidden line-clamp-5">
          {content}
        </p>
      </div>
    </div>
    </>
  );
};
export default NoteCard;