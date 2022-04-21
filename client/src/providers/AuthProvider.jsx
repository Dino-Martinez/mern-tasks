import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { node } from 'prop-types'
import AuthContext from '../hooks/useAuth'
export default function AuthProvider ({ children }) {
  const { data, loading } = useFetch('/api')
  const [authenticated, setAuth] = useState(false)

  useEffect(() => {
    if (!loading && data) setAuth(data.payload)
    console.log(data)
  }, [data, loading])

  return (
    <AuthContext.Provider value={{ authenticated: authenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: node
}
