import React, {useState } from 'react';
import Image from 'next/image';

const SignupModal = ({ showSignupModal, toggleSignupModal }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleAgeChange = (e) => {
    const { value } = e.target;
    if (!isNaN(value) && value >= 0) {
      setFormData((prevData) => ({
        ...prevData,
        age: value,
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //     toggleSignupModal();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = formData.name;
    const age = formData.age;
    const url = `http://localhost:8000/person/${name}/${age}/`;
    fetch(url)
    .then((response) => {
      if (response.status === 404) {
        fetch('http://localhost:8000/api/myapp/person/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then((postResponse) => {
            if (postResponse.status === 201 || postResponse.status === 200) {
              postResponse.json().then((data) => {
                const id = data.id;
                toggleSignupModal(id);
              });
            } else {
              console.log('Erro ao criar nova pessoa:', postResponse.status);
            }
          })
          .catch((postError) => {
            console.error('Erro ao criar nova pessoa:', postError);
          });
      } else if (response.status === 200) {
        response.json().then((data) => {
          const id = data.id; 
          toggleSignupModal(id);
        });
      } else {
        console.log('Erro inesperado:', response.status);
      }
    }
    )
    .catch((error) => {
      console.error('Erro:', error);
    });
};


  

  return (
    showSignupModal && (
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-transparent">
        <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-md bg-transparent bg-opacity-30"></div>
        <div className="z-50 bg-white shadow-xl p-6 rounded-md max-w-[47rem] w-[47rem] h-[35rem] overflow-auto">
          <div className="title w-full h-[10%] flex justify-center items-center">
            <h1 className="text-3xl ">Novo por aqui ? Logue ou Cadastre-se ...</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full h-[90%] p-10">
            <div className="mb-4 w-full h-[25%] flex justify-center items-start flex-col">
              <label htmlFor="name" className="text-black font-semibold text-xl bg-transparent">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome aqui ..."
                value={formData.name}
                onChange={handleChange}
                className="w-full text-black font-thin focus:shadow-2xl transition-all duration-300 rounded-md text-xl placeholder-opacity-100 outline-none bg-transparent px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="mb-4 w-full h-[25%] flex justify-center items-start flex-col">
              <label htmlFor="age" className="text-black font-semibold text-xl bg-transparent">
                Idade:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Digite sua idade aqui..."
                value={formData.age}
                onChange={handleAgeChange}
                className="w-full text-black text-xl font-thin focus:shadow-2xl transition-all duration-300 rounded-md placeholder-opacity-100 outline-none bg-transparent px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="mb-4 w-full h-[25%] flex justify-start items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="agreeTerms" className="text-gray-700">
                Concordo com os termos e condições
              </label>
            </div>
            <div className="w-full flex justify-end items-center">
              <button
                type="submit"
                className="w-[5rem] h-[3rem] flex justify-center items-center bg-black text-white  py-2 px-4 rounded-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300 focus:outline-none"
              >
                <Image
                  src="/icons/chevronright-icon.svg"
                  alt="menu-icon"
                  width="30"
                  height="25"
                  className=" bg-inherit"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default SignupModal;
