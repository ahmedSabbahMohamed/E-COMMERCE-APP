import React, { useState } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

function Count() {
    let [count, setCount] = useState(1)
    const [isDisabled, setIsDisabled] = useState(false)

    const countDown = () => {
      if (count <= 1) {
        setIsDisabled(true);
      } else {
        setCount(count - 1);
      }
    }
    const countUp = () => {
        setCount(count + 1);
        setIsDisabled(false)
    }

  return (
    <div className='bg-light w-100 m-0 rounded p-1 d-flex gap-3 align-items-center justify-content-between'>
        <button onClick={countDown} disabled={isDisabled} className='btn text-danger'><FaMinus /></button>
        <div>{count}</div>
        <button onClick={countUp} className='btn text-primary'><FaPlus /></button>
    </div>
  )
}

export default Count