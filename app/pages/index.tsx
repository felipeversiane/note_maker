import MainLayout from '../layouts/MainLayout';
import Image from "next/image"
import NoteCard from '../components/NoteCard'; 

const Index = () => {
  const notas = [
    {
      id: 1,
      title: 'Nota 1',
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum tempore voluptates tenetur facere. Sit ex nulla maiores molestiae dolorem distinctio quia vero voluptate a ad est harum facere, atque numquam!",
    },
  ];
  return(
  <MainLayout title='Notas'>
    <div className="notas-container">
      {notas.map((nota) => (
        <NoteCard
          key={nota.id}
          id={nota.id}
          title={nota.title}
          content={nota.content}
        />
      ))}
    </div>
  </MainLayout>
  );
  };
export default Index
