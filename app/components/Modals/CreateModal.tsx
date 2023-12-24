import { useState } from 'react';

const CreateModal = ({showCreateModal,togglePutModal}) => {
    const [newNote, setNewNote] = useState({ title: '', content: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
          ...newNote,
          [name]: value,
        });
      };
    
      const handleInputFocus = (e) => {
        const { name } = e.target;
        if (!newNote[name]) {
          setNewNote({
            ...newNote,
            [name]: ' ',
          });
        }
      };
    
      const handleInputBlur = (e) => {
        const { name } = e.target;
        if (newNote[name] === ' ') {
          setNewNote({
            ...newNote,
            [name]: '',
          });
        }
      };
    
      const closeOutsideModal = (e) => {
        if (e.target.classList.contains('backdrop')) {
          togglePutModal(newNote);
          setNewNote({ title: '', content: '' });

        }
      };
    return (
      <>
        {showCreateModal && (
          <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-transparent">
            <div
              className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-md bg-transparent bg-opacity-30 backdrop"
              onClick={closeOutsideModal}
            ></div>
            <div className="z-50 bg-white shadow-xl p-6 rounded-md max-w-[47rem] w-[47rem] h-[35rem] overflow-auto">
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Insira o título da sua nota"
                    value={newNote.title}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
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
                    value={newNote.content}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    className="w-full h-[25rem] bg-transparent px-3 py-2 placeholder-black placeholder-opacity-75 focus:outline-none resize-none"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default CreateModal;
  