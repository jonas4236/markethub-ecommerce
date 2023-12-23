import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const manage = () => {

  const { infoUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (infoUser) {
      return;
    }

    navigate("/login")
  }, [navigate])
  

  return (
    <div>manage</div>
  )
}

export default manage