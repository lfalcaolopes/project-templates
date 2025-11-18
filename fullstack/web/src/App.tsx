import { useEffect, useState } from 'react'

import { apiFetch } from './config/api'

function App() {
  const [data, setData] = useState<{ ok: boolean; now: string } | null>(null)

  useEffect(() => {
    apiFetch('/api/ping')
      .then((res) => res.json() as Promise<{ ok: boolean; now: string }>)
      .then((data) => setData(data))
      .catch((err) => console.error(err))
  }, [])
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-2xl font-bold'>Fullstack Template</h1>
      <p className='text-lg'>API Status: {data?.ok ? 'OK' : 'Error'}</p>
      <p className='text-sm'>{data?.now}</p>
    </div>
  )
}

export default App
