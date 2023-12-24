import { useState } from 'react';

interface EditModalProps {
  showEditModal: boolean;
  toggleEditModal: () => void;
  note: {
    id: number;
    title: string;
    content: string;
    creator:number
  };
  updateNote: (id: number, updatedNote: { title: string; content: string }) => void;
}

const EditModal: React.FC<EditModalProps> = ({ showEditModal, toggleEditModal, note, updateNote }) => {
  const [editedNote, setEditedNote] = useState({ title: note.title, content: note.content,creator:note.creator });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedNote({
      ...editedNote,
      [name]: value,
    });
  };

  const closeOutsideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('backdrop')) {
      updateNote(note.id, editedNote);
      toggleEditModal();
    }
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNote(note.id, editedNote);
    toggleEditModal();
  };

  return (
    <>
      {showEditModal && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-transparent">
          <div
            className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-md bg-transparent bg-opacity-30 backdrop"
            onClick={closeOutsideModal}
          ></div>
          <div className="z-50 bg-white shadow-xl p-6 rounded-md max-w-[47rem] w-[47rem] h-[35rem] overflow-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Insira o título da sua nota"
                  value={editedNote.title}
                  onChange={handleInputChange}
                  className="w-full text-black font-semibold text-xl placeholder-black placeholder-opacity-100 outline-none bg-transparent px-3 py-2 focus:outline-none"
                />
              </div>
              <hr className="my-4 border-t border-gray-400" />
              <div className="mb-4">
                <textarea
                  id="content"
                  name="content"
                  placeholder="Insira o conteúdo da sua nota"
                  value={editedNote.content}
                  onChange={handleInputChange}
                  className="w-full h-[25rem] bg-transparent px-3 py-2 placeholder-black placeholder-opacity-75 focus:outline-none resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end items-center">
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
