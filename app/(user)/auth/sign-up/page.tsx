"use client"
import React, { useState } from 'react'
import {SignUpForm} from '@/components/AppComponents/Form/SignUpForm'
import { SignUpFormSchema } from '@/config/zodModels'
import { z } from 'zod'
import { userBaseUrl } from '@/config/EnvConfig'

function SignUp() {
  const [formData,setFormData] = useState<any>()

  const handleSubmit = (data:z.infer<typeof SignUpFormSchema>)=>{
    setFormData(data)
    console.log(formData);
    
  }
  return (
    <div>
        <SignUpForm sendData={handleSubmit} />
    </div>
  )
}

export default SignUp