import React, { useState } from 'react'
import axios from 'axios'
import preview from '../assests/images/preview.png'
import Loader from '../components/Loader'

const CreateImage = ({ setCreate }) => {
  const [form, setForm] = useState({ name: '', prompt: '', img: '' })
  const [isloading, setIsLoading] = useState(false)
  const [share, setShare] = useState(false)

  // create image post request
  const createImage = (e) => {
    setIsLoading(true)
    e.preventDefault();
    const data = {
      prompt: form.prompt
    }
    axios.post('http://localhost:3002/api/createImage', data)
      .then(res => {
        setForm({ ...form, img: `data:image/jpeg;base64,${res.data.image}` })
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  //save image to db
  const post = () => {
    setShare(true)
    const data = {
      name: form.name,
      prompt: form.prompt,
      image: form.img
    }
    axios.post('http://localhost:3002/api/shareImage', data)
      .then(res => {
        console.log(res)
        setShare(false)
        setCreate(false)
      })
      .catch(err => {
        console.log(err)
        setShare(false)
      })
  }

  return (
    <React.Fragment>
      <h2 className='text-[36px] lg:text-[27px] md:text-[22px] p-3 mb-[75px] text-center font-bold'>Create images using Open AI Dall E </h2>

      <form className='flex justify-start flex-col w-[40%] md:w-[80%] xsm:w-[73%] ml-[50px]'>

        <label className='pl-1 font-medium'>Name</label>
        <input className='border border-gray-500 m-2 p-1 rounded focus:outline-gray-600 outline-1'
          name='name' value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
        <label className='pl-1 font-medium'>Prompt</label>
        <input className='border border-gray-500 m-2 p-1 rounded focus:outline-gray-600'
          name='prompt' autoComplete='off' onChange={(e) => { setForm({ ...form, prompt: e.target.value }) }} />
        <button className='m-2 p-1 bg-gray-600 text-white w-[20%] lg:w-[30%]  rounded' type='submit' onClick={createImage}>Create</button>

      </form>

      <div className='w-full mt-[30px]'>
        <div className="w-2/4 lg:w-full">
          {form.img ?
            <>
              {
                isloading &&
                <div className='absolute min-w-[31%] h-[482px] ml-[44px] bottom-0 top-0 bg-[#29292970] text-center'>
                  <div className='ml-[232px] mt-[200px]'>
                    <Loader />
                  </div>
                </div>
              }
              <img src={form.img} alt={form.prompt} className='h-[60vh] md:h-[50vh] sm:h-[43vh] xsm:h-[34vh] min-w-[31%] m-[44px] lg:ml-[125px]' />

              <button className='m-2 p-1 bg-gray-600 text-white w-2/12 rounded ml-[160px] mb-[20px]' onClick={post}>
                {share ? 'Sharing...' : 'Share to home page'}
              </button>
            </>
            :
            <>
              {isloading &&
                <div className='absolute w-[42%] lg:w-[66%] md:w-[83%] xsm:w-[77%] right-0 bg-[#29292970] h-[483px] lg:h-[420px] md:h-[351px] sm:h-[300px] xsm:h-[240px] left-[58px] lg:left-[136px] md:left-[39px]'>
                  <div className='ml-[232px] mt-[200px] md:mt-[147px] md:ml-[156px] sm:mt-[125px] sm:ml-[132px] xsm:mt-[95px] xsm:ml-[109px]'>
                    <Loader />
                  </div>
                </div>}
              <img src={preview} alt='default image' className='h-[61vh] md:h-[50vh] sm:h-[43vh] xsm:h-[34vh] mx-auto' />
            </>
          }
        </div>
      </div>


    </React.Fragment>
  )
}

export default CreateImage
