import NoteCard from '../Cards/NoteCard';

const NoteGrid = ({ notas,fetchNotesByCreator}) => {
    return (
      <div className="w-full h-[85%] overflow-auto grid grid-cols-3 gap-6 pb-10 px-5">
        {notas.length === 0 ? (
          <div className="flex justify-center items-center text-gray-500 text-xl font-semibold col-span-3">
            Nenhuma nota encontrada
          </div>
        ) : (
          notas.map((nota) => (
            <NoteCard
              key={nota.id}
              id={nota.id}
              title={nota.title}
              content={nota.content}
              creator={nota.creator}
              fetchNotesByCreator={fetchNotesByCreator}
            />
          ))
        )}
      </div>
    );
  };
  

export default NoteGrid;
