  import React, {useState } from 'react';
  import Image from 'next/image';

  const SignupModal = ({ showSignupModal, toggleSignupModal }) => {
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const name = formData.name;
      const age = formData.age;
      const url = `http://localhost:8000/person/${name}/${age}/`;
    
      try {
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          const id = data.id;
          toggleSignupModal(id);
        } else if (response.status === 404) {
          const postResponse = await fetch('http://localhost:8000/api/myapp/person/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (postResponse.ok) {
            const postData = await postResponse.json();
            toggleSignupModal(postData.id);
          } else if (postResponse.status === 400) {
            setErrorMessage('Nome já existente');
          } else {
            console.error('Erro ao criar nova pessoa:', postResponse.status);
          }
        } else {
          console.error('Erro inesperado:', response.status);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    

    

    return (
      showSignupModal && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-transparent">
          <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-md bg-transparent bg-opacity-30"></div>
          <div className="z-50 bg-white shadow-xl p-6 rounded-md max-w-[47rem] w-[47rem] h-[35rem] overflow-auto">
            <div className="title w-full h-[5%] flex justify-center items-center">
              <h1 className="text-3xl ">Novo por aqui ? Logue ou Cadastre-se ...</h1>
            </div>
            {errorMessage && (
            <div className=" h-[1%] flex justify-center items-center w-full text-red-500 text-center mt-4">{errorMessage}</div>
          )}
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
