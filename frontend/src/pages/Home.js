import React, { useEffect, useState } from 'react'
import logo from '../assests/images/OpenAI_Logo.png'
import CreateImage from './CreateImage'
import axios from 'axios'
const Home = () => {
  const [create, setCreate] = useState(false)
  const [data, setData] = useState(false)

  //create image page
  const openPage = () => {
    setCreate(true)
  }

  //get all saved images from db
  useEffect(() => {
    axios.get('http://localhost:3002/api/getShareImage')
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)

      })
  }, [create])

  return (
    <React.Fragment>

      {create ? <CreateImage setCreate={setCreate} />
        :
        <>
          <header className='flex justify-between xsm:flex-col xsm:items-center p-3 bg-slate-50'>
            <img src={logo} alt='logo' className='w-36 h-[3vh] mt-[18px]' />
            <div className='text-center m-3 xsm:mt-[27px] xsm:ml-[36px]'>
              <button className='bg-green-400 p-2 rounded-full' onClick={openPage}>Create Image</button>
            </div>
          </header>

          <h1 className='text-[36px] md:text-[30px] p-3 text-center font-bold'>Shared Images</h1>

          <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-11 md:gap-8 m-6 '>

            {data &&
              data.map((img) => (
                <div className='relative group'>
                  <img src={img.image} alt={img.prompt} className='rounded-3xl' />

                  <div className='bg-[#1d1d1dde] h-[16vh] absolute left-0 right-0 bottom-0 rounded-3xl invisible group-hover:visible'>
                    <p className='mt-[12px] ml-[16px] mb-5 text-white'>{img.prompt}</p>
                    <div className='flex'>
                      <div className='w-[50px] ml-[16px] h-[50px] bg-gray-800 rounded-full text-white flex justify-center items-center'>{img.name[0]}</div>
                      <p className='mt-[12px] ml-[16px] text-white'>{img.name}</p>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </>
      }

    </React.Fragment>
  )
}

export default Home
